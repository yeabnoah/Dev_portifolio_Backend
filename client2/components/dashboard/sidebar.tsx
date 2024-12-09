"use client";

import {
  BarChart,
  User,
  Link,
  FolderKanban,
  FileText,
  MessageSquare,
  Briefcase,
  Info,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const navItems = [
  // { icon: BarChart, label: "Analytics", href: "/dashboard" },
  { icon: FileText, label: "Articles", href: "/dashboard/articles" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  {
    icon: MessageSquare,
    label: "Testimonials",
    href: "/dashboard/testimonials",
  },
  { icon: Briefcase, label: "Skills", href: "/dashboard/skills" },
  { icon: Info, label: "About", href: "/dashboard/about" },
  { icon: Link, label: "Links", href: "/dashboard/links" },
  { icon: User, label: "Profile", href: "/dashboard/" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Portfolio Dashboard</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close Sidebar</span>
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex flex-col h-[calc(100vh-5rem)]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto">
          <Separator className="my-4" />
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleLogout} className="w-full">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src="/nerd.png?height=32&width=32"
                          alt="User"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-muted-foreground">
                          Logout
                        </span>
                      </div>
                      <LogOut className="h-5 w-5 ml-auto" />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
