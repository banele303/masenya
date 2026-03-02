"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useState } from "react";
import { Eye, Mail, Phone } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

const INQUIRY_STATUSES = [
  { value: "new", label: "New", color: "bg-orange-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "closed", label: "Closed", color: "bg-green-500" },
  { value: "archived", label: "Archived", color: "bg-gray-500" },
];

export default function AdminOrdersTab() {
  // We use inquiries as "Orders" for now in this context
  const inquiries = useQuery(api.inquiries.getAll, {});
  const updateStatus = useMutation(api.inquiries.updateStatus);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStatusChange = async (
    id: Id<"inquiries">,
    status: string
  ) => {
    try {
      await updateStatus({ id, status });
      toast.success("Status updated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = INQUIRY_STATUSES.find((s) => s.value === status) || { value: status, label: status, color: "bg-gray-500" };
    return (
      <Badge className={statusConfig.color}>
        {statusConfig.label}
      </Badge>
    );
  };

  const filteredInquiries = inquiries?.filter(
    (inquiry) => filterStatus === "all" || inquiry.status === filterStatus
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Inquiries</CardTitle>
            <CardDescription>Manage customer inquiries and leads</CardDescription>
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Inquiries</SelectItem>
              {INQUIRY_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No inquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInquiries?.map((inquiry) => (
                  <TableRow key={inquiry._id}>
                    <TableCell className="text-sm">
                      {formatDate(inquiry._creationTime)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {inquiry.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col text-sm">
                        <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:underline">
                          <Mail className="h-3 w-3" /> {inquiry.email}
                        </a>
                        <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:underline">
                          <Phone className="h-3 w-3" /> {inquiry.phone}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={inquiry.message}>
                      {inquiry.message}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={inquiry.status}
                        onValueChange={(val) =>
                          handleStatusChange(inquiry._id, val)
                        }
                      >
                        <SelectTrigger className="w-[130px] h-8">
                          {getStatusBadge(inquiry.status)}
                        </SelectTrigger>
                        <SelectContent>
                          {INQUIRY_STATUSES.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
