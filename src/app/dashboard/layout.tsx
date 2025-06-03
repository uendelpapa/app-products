import { SidebarServer } from "@/components/sidebar-server";
import React from "react";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarServer />
      <main className="flex-1 p-6 bg-default-50 dark:bg-default-950">
        {children}
      </main>
    </div>
  );
}
