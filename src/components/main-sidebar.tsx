'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { BookOpen, LayoutDashboard, Languages, Settings } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/lists',
    icon: BookOpen,
    label: 'Vocab Lists',
  },
];

const logo = placeholderImages.logo;

export function MainSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="items-center justify-between p-4">
        <div className="flex items-center gap-2">
            {logo ? 
              <Image src={logo.imageUrl} alt={logo.description} data-ai-hint={logo.imageHint} width={32} height={32} className="rounded-lg" />
              : <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Languages className="h-5 w-5" />
                </div>
            }
            <span className="text-lg font-headline font-semibold group-data-[collapsible=icon]:hidden">
                Kotoba Sensei
            </span>
        </div>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="ghost" className="w-full justify-start gap-2 p-2">
            <Settings />
            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
