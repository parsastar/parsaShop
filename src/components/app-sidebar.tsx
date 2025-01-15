"use client";
import {
  DollarSign,
  Home,
  LogOut,
  Package,
  Shapes,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useSidebarStore } from "src/store/sidebarStore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Menu items.
const ADMINPAGES = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },

  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: Shapes,
  },
  {
    title: "Paymnets",
    url: "/dashboard/payments",
    icon: DollarSign,
  },
];

const USERPAGES = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Package,
  },
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingCart,
  },
];

type TSessionUserData = {
  email: string;
  id: string;
  pocket: number;
  name: string;
  role: "ADMIN" | "USER";
};
export function AppSidebar({ user }: { user: TSessionUserData }) {
  const { open } = useSidebarStore();
  const session = useSession();
  const router = useRouter();
  const signOutHandler = () => {
    if (session) {
      signOut();
    } else {
      router.push("/signin");
    }
  };
  const items = user.role == "ADMIN" ? ADMINPAGES : USERPAGES;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <MyHeader user={user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Button
            onClick={() => signOutHandler()}
            className={`w-full ${
              open ? "gap-2" : "gap-0"
            }  flex bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground shadow-none`}
            size="sm"
          >
            <LogOut />
            <p
              className={`overflow-hidden duration-100 ${
                open ? "max-w-[200px] opacity-100" : "max-w-[00px] opacity-0"
              }`}
            >
              log out{" "}
            </p>
          </Button>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

function MyHeader({ user }: { user: TSessionUserData }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 bg-gray-300 flex items-center justify-center w-8 rounded-lg">
        <AvatarFallback className="rounded-lg">
          {user.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.name}</span>
        <span className="truncate text-xs">{user.email}</span>
      </div>
    </div>
  );
}
