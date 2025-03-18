import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  plan: "Bronze",
  joinDate: "January 2024",
};

interface ProfileInfoProps {
  onUpgrade: () => void;
}

export function ProfileInfo({ onUpgrade }: ProfileInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p>{mockUserData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{mockUserData.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
              <p>{mockUserData.plan}</p>
            </div>
            <Button onClick={onUpgrade}>Upgrade Plan</Button>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Member Since</p>
            <p>{mockUserData.joinDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}