"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex items-center justify-between p-4 border-b md:hidden">
      <h1 className="text-lg font-semibold">Portfolio Dashboard</h1>
      <Button variant="ghost" size="icon" onClick={toggleSidebar}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </header>
  );
}
