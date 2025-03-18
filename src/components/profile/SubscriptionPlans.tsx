import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Bronze",
    price: "Free",
    features: [
      "Basic assessment access",
      "Limited archive space (10 articles)",
      "Standard support",
    ],
    current: true,
  },
  {
    name: "Silver",
    price: "$9.99/month",
    features: [
      "Aggregated assessments",
      "Extended archive space (100 articles)",
      "Priority support",
      "Advanced analytics",
    ],
    current: false,
  },
  {
    name: "Gold",
    price: "$19.99/month",
    features: [
      "Unlimited assessments",
      "Unlimited archive space",
      "24/7 Premium support",
      "Custom analytics dashboard",
      "API access",
    ],
    current: false,
  },
];

interface SubscriptionPlansProps {
  onClose: () => void;
}

export function SubscriptionPlans({ onClose }: SubscriptionPlansProps) {
  const { toast } = useToast();

  const handleUpgrade = (planName: string) => {
    toast({
      title: "Plan upgrade initiated",
      description: `You selected the ${planName} plan. This is a mock upgrade.`,
    });
    onClose();
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} className="relative">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <p className="text-2xl font-bold">{plan.price}</p>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-4 w-full"
              variant={plan.current ? "outline" : "default"}
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}