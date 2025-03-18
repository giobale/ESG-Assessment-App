import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ReviewHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-primary">Assessment Review</h1>
      <Button variant="outline" onClick={() => navigate("/")}>
        Back to Assessments
      </Button>
    </div>
  );
}