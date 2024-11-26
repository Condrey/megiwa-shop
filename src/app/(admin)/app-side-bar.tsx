"use client";

import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  LucideIdCard,
  Map,
  PieChart,
  Settings2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/app/(admin)/nav-main";
import { NavProjects } from "@/app/(admin)/nav-projects";
import { NavUser } from "@/app/(admin)/nav-user";
import { TeamSwitcher } from "@/app/(admin)/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const shopId = "t326t8vc2g881vv8d-d2ebdb2-21dHHUV";
const productQueryParams = new URLSearchParams({
  referralInfo: "sidebar",
  selectedColumns:
    "0,Name,ProductType,ProductSku,ComparePrice,ProductInventoryStatus,ProductRibbon+false,ProductBrand+false",
  viewId: "all-items-view",
}).toString();
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Store products",
      url: `/manage/${shopId}/megiwa-stores/products`,
      icon: LucideIdCard,
      isActive: true,
      items: [
        {
          title: "Products",
          url: `/manage/${shopId}/megiwa-stores/products?${productQueryParams}`,
        },
        {
          title: "Inventory",
          url: `/manage/${shopId}/megiwa-stores/inventory`,
        },
        {
          title: "Categories",
          url: `/manage/${shopId}/megiwa-stores/categories`,
        },
        {
          title: "Back in stock requests",
          url: `/manage/${shopId}/megiwa-stores/back-in-stock-requests`,
        },
        {
          title: "Find products to sell",
          url: `/manage/${shopId}/megiwa-stores/find-products-to-sell`,
        },
      ],
    },

    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
