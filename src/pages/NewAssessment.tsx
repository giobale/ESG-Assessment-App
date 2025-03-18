import { useState } from "react";
import { AssessmentCard } from "@/components/AssessmentCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Mock data - In production, this would come from an API
const mockAssessments = [
  {
    id: 1,
    title: "Environmental Benefits of Products/Services",
    category: "Environmental",
    price: 150,
    time: "1 h",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
  },
  {
    id: 2,
    title: "Energy Production and Use",
    category: "Environmental",
    price: 25,
    time: "45 m",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: 3,
    title: "Protection of Human and Workers' Rights",
    category: "Social",
    price: 200,
    time: "1 h 45 m",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },
  {
    id: 4,
    title: "Ethics and Integrity",
    category: "Governance",
    price: 200,
    time: "1 h",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
  },
];

// Get unique categories from mockAssessments
const categories = ["All categories", ...new Set(mockAssessments.map(a => a.category))];

// Mock companies - In production, this would come from an API
const mockCompanies = [
  { id: 1, name: "Mediaset" },
  { id: 2, name: "Mondadori" },
  { id: 3, name: "Forza Italia" },
];

const NewAssessment = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All categories");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { toast } = useToast();

  const handleStartAssessment = () => {
    if (!selectedCompany) {
      toast({
        title: "Please select a company",
        description: "You need to select a company to start the assessment.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Assessment started",
      description: `Starting ${selectedAssessment.title} for ${selectedCompany}`,
    });
  };

  const filteredAssessments = mockAssessments
    .filter(assessment => 
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "All categories" || assessment.category === selectedCategory)
    );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">New Assessment</h1>
          <p className="text-muted-foreground">
            Select an assessment to evaluate your company's performance
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to My Assessments
        </Button>
      </div>

      <div className="mb-6 flex gap-4 items-center">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <Dialog key={assessment.id}>
            <DialogTrigger asChild>
              <div onClick={() => setSelectedAssessment(assessment)}>
                <AssessmentCard
                  title={assessment.title}
                  category={assessment.category}
                  price={assessment.price}
                  time={assessment.time}
                  image={assessment.image}
                  onClick={() => {}}
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{assessment.title}</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <label className="block text-sm font-medium mb-2">
                  Select Company
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">Select a company...</option>
                  {mockCompanies.map((company) => (
                    <option key={company.id} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleStartAssessment} className="bg-accent hover:bg-accent/90">
                  Start Assessment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default NewAssessment;
