import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { SubscriptionPlans } from "@/components/profile/SubscriptionPlans";

export function Profile() {
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="container py-6 animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-6">
        <ProfileInfo onUpgrade={() => setShowPlans(true)} />

        <Dialog open={showPlans} onOpenChange={setShowPlans}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Choose Your Plan</DialogTitle>
            </DialogHeader>
            <SubscriptionPlans onClose={() => setShowPlans(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}