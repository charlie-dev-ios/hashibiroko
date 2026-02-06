"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import {
  homeLink,
  navigationSections,
} from "@/components/navigation/navigation-links";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLinkClick = () => {
    // モバイルでリンククリック時にサイドバーを閉じる
    setOpenMobile(false);
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive(homeLink.href)}>
                  <Link href={homeLink.href} onClick={handleLinkClick}>
                    <homeLink.icon className="h-4 w-4" />
                    <span>{homeLink.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {navigationSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.links.map((link) => (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton asChild isActive={isActive(link.href)}>
                      <Link href={link.href} onClick={handleLinkClick}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
