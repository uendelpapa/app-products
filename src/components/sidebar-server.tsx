"use server"
import { cookies } from "next/headers";
import { Sidebar } from "./sidebar";

export async function SidebarServer() {
  const cookieStore = cookies();
  const userName = cookieStore.get("session_username")?.value || null;
  const email = cookieStore.get("session_email")?.value || null;

  return <Sidebar username={userName} email={email} />;
}