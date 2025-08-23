"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({ utilities }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {utilities.map((utility) => (
          <SidebarMenuItem key={utility.name}>
            <SidebarMenuButton asChild tooltip={utility.name}>
              <a
                href={utility.url}
                className="flex items-center gap-2 w-full px-2 py-1 rounded-md
                           bg-sidebar text-sidebar-foreground
                           transition-colors duration-200
                           hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {utility.icon && <utility.icon className="flex-shrink-0 w-4 h-4" />}
                <span className="truncate">{utility.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
