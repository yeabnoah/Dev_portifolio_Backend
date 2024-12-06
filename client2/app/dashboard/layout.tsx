import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <MobileHeader />
          <main className="flex-1 w-2/3 overflow-y-auto bg-background p-4 md:p-8">
            <ThemeToggle />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
