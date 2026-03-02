"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SetupPage() {
  const seedDatabase = useMutation(api.seed.seed);

  const handleSeed = async () => {
    try {
      const result = await seedDatabase();
      toast.success(result.message + ` (${result.count} cars)`);
    } catch (error) {
      toast.error("Failed to seed database");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="text-3xl font-display font-bold mb-4">
          Database Setup
        </h1>
        <p className="text-muted-foreground mb-8">
          Click the button below to populate the database with demo products for
          Xpert Auto Parts.
        </p>
        <Button onClick={handleSeed} className="btn-primary rounded-full px-8">
          Seed Database with Demo Spares
        </Button>
      </div>
    </div>
  );
}
