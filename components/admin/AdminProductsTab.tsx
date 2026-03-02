"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Image as ImageIcon,
  Search,
  Plus,
  Car
} from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

interface AdminProductsTabProps {
  initialCategory?: string;
}

const BODY_TYPES = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Bakkie", "Van", "Wagon"];
const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric"];
const TRANSMISSIONS = ["Automatic", "Manual"];

export default function AdminProductsTab({ initialCategory }: AdminProductsTabProps) {
  // We ignore initialCategory as we only manage Cars
  const cars = useQuery(api.cars.getAll, { make: "all" });
  const createCar = useMutation(api.cars.create);
  const updateCar = useMutation(api.cars.update);
  const deleteCar = useMutation(api.cars.remove);
  const generateUploadUrl = useMutation(api.cars.generateUploadUrl);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Automatic",
    engineSize: "",
    color: "",
    bodyType: "Sedan",
    description: "",
    features: "",
    images: [] as File[],
    isFeatured: false,
    isDealOfWeek: false,
    isAvailable: true
  });
  
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const resetForm = () => {
    setFormData({
        make: "",
        model: "",
        year: new Date().getFullYear(),
        price: 0,
        mileage: 0,
        fuelType: "Petrol",
        transmission: "Automatic",
        engineSize: "",
        color: "",
        bodyType: "Sedan",
        description: "",
        features: "",
        images: [],
        isFeatured: false,
        isDealOfWeek: false,
        isAvailable: true
    });
    setImagePreviews([]);
    setExistingImages([]);
    setEditingCar(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (car: any) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage || 0,
      fuelType: car.fuelType,
      transmission: car.transmission,
      engineSize: car.engineSize || "",
      color: car.color || "",
      bodyType: car.bodyType || "Sedan",
      description: car.description,
      features: car.features?.join(", ") || "",
      images: [],
      isFeatured: car.isFeatured || false,
      isDealOfWeek: car.isDealOfWeek || false,
      isAvailable: car.isAvailable !== false
    });
    setExistingImages(car.images || []);
    setIsDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeNewImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const finalImages: string[] = [...existingImages];

      // Upload new images
      for (const file of formData.images) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        finalImages.push(storageId);
      }

      const carData = {
        make: formData.make,
        model: formData.model,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        engineSize: formData.engineSize,
        color: formData.color,
        bodyType: formData.bodyType,
        description: formData.description,
        features: formData.features.split(",").map(f => f.trim()).filter(f => f),
        images: finalImages,
        isFeatured: formData.isFeatured,
        isDealOfWeek: formData.isDealOfWeek,
        isAvailable: formData.isAvailable,
      };

      if (editingCar) {
        await updateCar({
          id: editingCar._id,
          ...carData,
        });
        toast.success("Car updated successfully!");
      } else {
        await createCar(carData);
        toast.success("Car added successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to save car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: Id<"cars">) => {
    if (confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar({ id });
        toast.success("Car deleted successfully!");
      } catch (error: any) {
        toast.error(error.message || "Failed to delete car");
      }
    }
  };

  const filteredCars = cars?.filter((car) =>
    (car.make + " " + car.model).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <Button onClick={openCreateDialog} className="h-11">
            <Plus className="mr-2 h-4 w-4" /> Add Car
          </Button>
        </div>

        <div className="rounded-xl border border-muted/60 overflow-hidden bg-background">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead>Car</TableHead>
                <TableHead>Specs</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No cars found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCars?.map((car) => (
                  <TableRow key={car._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{car.make} {car.model}</span>
                        <span className="text-xs text-muted-foreground">{car.year}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {car.mileage?.toLocaleString()} km • {car.transmission} • {car.fuelType}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold">R{car.price.toLocaleString("en-ZA")}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                         {car.isAvailable ? (
                            <Badge className="bg-green-500">Available</Badge>
                         ) : (
                            <Badge variant="destructive">Sold</Badge>
                         )}
                         {car.isFeatured && <Badge variant="outline">Featured</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(car)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(car._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCar ? "Edit Car" : "Add New Car"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: Number(e.target.value)})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (R)</Label>
                    <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km)</Label>
                    <Input id="mileage" type="number" value={formData.mileage} onChange={(e) => setFormData({...formData, mileage: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Transmission</Label>
                    <Select value={formData.transmission} onValueChange={(val) => setFormData({...formData, transmission: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{TRANSMISSIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(val) => setFormData({...formData, fuelType: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{FUEL_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Body Type</Label>
                    <Select value={formData.bodyType} onValueChange={(val) => setFormData({...formData, bodyType: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{BODY_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
               </div>
               
               <div className="space-y-2">
                  <Label>Features (comma separated)</Label>
                  <Textarea value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} />
               </div>

                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="flex flex-wrap gap-2">
                    {existingImages.map((img, i) => (
                        <div key={`existing-${i}`} className="relative h-20 w-20 border rounded overflow-hidden">
                             {/* Note: We can't show easy preview if these are IDs without a helper. Future improvement. */}
                             <div className="bg-gray-200 w-full h-full flex items-center justify-center text-xs text-center p-1 break-all">Image {i+1}</div>
                             <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1"><Trash2 className="h-3 w-3"/></button>
                        </div>
                    ))}
                    {imagePreviews.map((preview, i) => (
                        <div key={`new-${i}`} className="relative h-20 w-20 border rounded overflow-hidden">
                             <img src={preview} className="object-cover w-full h-full" alt="preview"/>
                             <button type="button" onClick={() => removeNewImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-1"><Trash2 className="h-3 w-3"/></button>
                        </div>
                    ))}
                    <label className="h-20 w-20 border-dashed border-2 flex items-center justify-center cursor-pointer hover:bg-muted">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <Switch checked={formData.isAvailable} onCheckedChange={(c) => setFormData({...formData, isAvailable: c})} />
                     <Label>Available</Label>
                  </div>
                  <div className="flex items-center gap-2">
                     <Switch checked={formData.isFeatured} onCheckedChange={(c) => setFormData({...formData, isFeatured: c})} />
                     <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                     <Switch checked={formData.isDealOfWeek} onCheckedChange={(c) => setFormData({...formData, isDealOfWeek: c})} />
                     <Label>Deal of Week</Label>
                  </div>
               </div>

               <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Car"}</Button>
               </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
