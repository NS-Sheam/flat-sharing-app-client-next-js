"use client";

import DashboardDrawer from "@/components/UI/Dashboard/DashboardDrawer/DashboardDrawer";
import { isLoggedIn } from "@/services/auth.services";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  console.log("DashboardLayout", isLoggedIn());

  if (!isLoggedIn()) {
    return router.push("/login");
  }

  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
