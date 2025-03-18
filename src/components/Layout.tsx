import { AppSidebar } from "./AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary">
      <AppSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}