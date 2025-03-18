import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Assessment {
  id: number;
  title: string;
  company: string;
  status: string;
  rating: number;
  category: string;
  completedDate?: string;
  lastAccess?: string;
}

interface AssessmentListProps {
  assessments: Assessment[];
}

export function AssessmentList({ assessments }: AssessmentListProps) {
  const navigate = useNavigate();

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return "text-green-500";
    if (rating >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const handleViewReport = () => {
    toast("Report viewed successfully!");
  };

  const handleFinishAssessment = () => {
    toast("Redirecting to assessment...");
  };

  return (
    <div className="space-y-4">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{assessment.title}</h3>
              <p className="text-sm text-muted-foreground">
                Company: {assessment.company}
              </p>
              <p className="text-sm text-muted-foreground">
                Survey Category: {assessment.category}
              </p>
            </div>
            <span className={`font-bold ${getRatingColor(assessment.rating)}`}>
              {assessment.rating}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button onClick={() => navigate(`/assessment-review/${assessment.id}`)}>
                Review
              </Button>
              {assessment.status === "completed" ? (
                <Button variant="outline" onClick={handleViewReport}>
                  View Report
                </Button>
              ) : (
                <Button variant="outline" onClick={handleFinishAssessment}>
                  Finish
                </Button>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {assessment.status === "completed"
                ? `Completed: ${assessment.completedDate}`
                : `Last access: ${assessment.lastAccess}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}