"use client";

import * as React from "react";
import {
  Home,
  LayoutDashboard,
  CreditCard,
  UserPlus
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SidebarLogo } from "@/components/nav-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

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
};

export function AppSidebar({ activeTab, ...props }) {

  const utilitiesWithActive = data.utilities.map((tab) => ({
    ...tab,
    isActive: tab.name === activeTab,
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo organization={data.logo[0]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain utilities={utilitiesWithActive} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
