import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import "./dashcss.css";
import DashHeader from "@/components/shared/DashHeader";
import AdminModal from "@/components/template/dashboard/modal/AdminModal";
import { DeleteDialog } from "@/components/shared/DeleteDialog";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signup");
  return (
    <>
      <SidebarProvider>
        <Suspense fallback={"loading user "}>
          <AppSidebar user={session.user} />
        </Suspense>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashHeader />
          </header>
          <div className="px-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
      <AdminModal />
      <DeleteDialog />
    </>
  );
};
export default DashboardLayout;
