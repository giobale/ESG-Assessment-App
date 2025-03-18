import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createCompany } from "@/services/companyService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const sectorInfo = {
  Technology: {
    description: "The technology sector includes companies that design, develop, and market innovative software, hardware, and IT services.",
    examples: "Software firms, cloud computing providers, and IT consulting companies.",
  },
  Healthcare: {
    description: "The healthcare sector encompasses companies involved in medical services, pharmaceuticals, and biotechnology.",
    examples: "Hospitals, pharmaceutical manufacturers, and biotech firms.",
  },
  Finance: {
    description: "The finance sector includes companies providing financial services to commercial and retail customers.",
    examples: "Banks, insurance companies, and investment firms.",
  },
  Manufacturing: {
    description: "The manufacturing sector comprises companies that produce physical goods through processing of raw materials.",
    examples: "Automotive manufacturers, electronics producers, and industrial equipment makers.",
  },
  Retail: {
    description: "The retail sector includes businesses that sell goods directly to consumers.",
    examples: "Department stores, e-commerce platforms, and specialty retailers.",
  },
  Media: {
    description: "The media sector encompasses companies involved in the creation and distribution of content.",
    examples: "Broadcasting networks, streaming services, and digital media companies.",
  },
  Publishing: {
    description: "The publishing sector includes companies that produce and distribute printed and digital content.",
    examples: "Book publishers, digital content platforms, and academic journals.",
  },
  Other: {
    description: "This category includes companies that don't fit into the standard sector classifications.",
    examples: "Various specialized businesses across different industries.",
  },
};

const sectors = Object.keys(sectorInfo);

const formSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  sector: z.string().min(1, "Sector is required"),
});

export default function CreateCompany() {
  const navigate = useNavigate();
  const [selectedSector, setSelectedSector] = useState<string>("");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sector: "",
    },
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => createCompany(values),
    onSuccess: (company) => {
      toast.success("Company created successfully");
      navigate(`/company/${company.id}`);
    },
    onError: () => {
      toast.error("Failed to create company");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    create(values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Create Company</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sector</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedSector(value);
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/my-companies")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Company"}
            </Button>
          </div>
        </form>
      </Form>

      {selectedSector && (
        <Card className="mt-8 p-6 bg-secondary/50">
          <h3 className="text-lg font-semibold mb-4">{selectedSector} Sector Information</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Description:</p>
              <p className="text-muted-foreground">{sectorInfo[selectedSector as keyof typeof sectorInfo].description}</p>
            </div>
            <div>
              <p className="font-medium">Typical Examples:</p>
              <p className="text-muted-foreground">{sectorInfo[selectedSector as keyof typeof sectorInfo].examples}</p>
            </div>
            <div className="flex items-start gap-2 mt-4 p-4 bg-accent/10 rounded-md">
              <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
              <p className="text-sm">
                Please select the sector carefully, as it will impact the way the assessment scores are calculated.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}