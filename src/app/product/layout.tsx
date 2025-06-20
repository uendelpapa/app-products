import { SidebarServer } from "@/components/sidebar-server";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cafés | Coffee Mania",
  description: "Generated by create next app",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex p-2 w-full min-h-screen">
      <SidebarServer />
      <div className="flex-1 md:pl-4">{children}</div>
    </main>
  );
}
