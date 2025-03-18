import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  FileText,
  Newspaper,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";

const links = [
  {
    to: "/",
    icon: BarChart3,
    label: "My Assessments",
  },
  {
    to: "/my-companies",
    icon: Building2,
    label: "My Companies",
  },
  {
    to: "/news",
    icon: Newspaper,
    label: "News",
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <aside className="flex h-screen w-64 flex-col gap-4 border-r bg-background p-6">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <FileText className="h-6 w-6" />
        <span>Assessment App</span>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "transparent"
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
        
        <div className="mt-auto flex flex-col gap-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "transparent"
              )
            }
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </NavLink>
          
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </nav>
    </aside>
  );
}