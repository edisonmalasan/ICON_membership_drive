import * as React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarLogo({ organization }) {
  if (!organization) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default" onClick={() => window.location.href = "/home"}>
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square w-8 h-8 items-center justify-center rounded-lg">
            <organization.logo className="w-4 h-4" />
          </div>
          <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{organization.name}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
