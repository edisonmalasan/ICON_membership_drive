import * as React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { ThemeProvider } from "./theme-provider";

export function SidebarLogo({ organization }) {
  if (!organization) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default"
          onClick={() => (window.location.href = "/home")}
        >
          <div className="text-white flex aspect-square w-8 h-8 items-center justify-center rounded-lg">
            <organization.logo/>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{organization.name}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
