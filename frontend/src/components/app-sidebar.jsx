import * as React from "react"
import {
  Home,
  LayoutDashboard,
  GalleryVerticalEnd,
  CreditCard,
  UserPlus
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { SidebarLogo } from "@/components/nav-logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "admin",
    email: "admin@example.com",
    avatar: "ICON.png",
  },
  logo: [
    {
      name: "Integrated Confederacy",
      logo: Home
    }
  ],
  utilities: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      name: "Manage Payments",
      url: "/manage-payments",
      icon: CreditCard,
    },
    {
      name: "Manual Account Creation",
      url: "/account-creation",
      icon: UserPlus,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo organization={data.logo[0]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain utilities={data.utilities} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
