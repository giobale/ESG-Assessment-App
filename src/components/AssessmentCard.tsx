import { Clock, Euro } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentCardProps {
  title: string;
  category: string;
  price: number;
  time: string;
  image: string;
  onClick: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "environmental":
      return "bg-green-100 text-green-800";
    case "social":
      return "bg-pink-100 text-pink-800";
    case "governance":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-secondary text-primary";
  }
};

export function AssessmentCard({
  title,
  category,
  price,
  time,
  image,
  onClick,
}: AssessmentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl p-6 shadow-sm cursor-pointer transition-all h-full",
        "hover:shadow-md hover:scale-[1.02] animate-fade-in"
      )}
    >
      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2 text-primary min-h-[3.5rem]">{title}</h3>
      <div className="flex items-center gap-2 text-sm mb-2">
        <span className={cn("px-2 py-1 rounded-full", getCategoryColor(category))}>
          {category}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Euro size={16} />
          <span>{price} EUR</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}