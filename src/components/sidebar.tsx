"use client";
import Link from "next/link";
import {
  IconCoffee,
  IconDashboard,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { Button } from "@heroui/button";

interface SidebarProps {
  username: string | null;
  email: string | null;
}

export function Sidebar({ username, email }: SidebarProps) {
  function handleLogout() {
    // Apaga todos os cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
    });
    // Opcional: redireciona para a página de login
    window.location.href = "/login";
  }

  return (
    <aside className="max-w-60 w-full flex flex-col flex-1 border-r border-default-200 dark:border-default-700 bg-default-100 dark:bg-default-900 rounded-xl">
      <div className="p-6 flex items-center gap-2 text-xl font-bold">
        <IconCoffee className="size-6" />
        Coffee Mania
      </div>
      <nav className="flex flex-col gap-2 px-4 justify-between space-y-4 h-full">
        <div className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-default-200 dark:hover:bg-default-800 transition-colors"
          >
            <IconDashboard className="size-5" />
            Dashboard
          </Link>
          <Link
            href="/product"
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-default-200 dark:hover:bg-default-800 transition-colors"
          >
            <IconCoffee className="size-5" />
            Cafés
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded bg-default-200 dark:bg-default-800">
            <div>
              <IconUser className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">
                {username
                  ? username.charAt(0).toUpperCase() + username.slice(1)
                  : null}
              </span>
              <span className="text-sm font-semibold">{email}</span>
            </div>
          </div>
          <Button color="danger" size="md" onPress={() => handleLogout()}>
            <span className="text-sm font-bold">Sair</span>
            <IconLogout className="size-5" />
          </Button>
        </div>
      </nav>
      <div className="mt-auto p-4 text-xs text-default-500">
        &copy; {new Date().getFullYear()} Coffee Mania
      </div>
    </aside>
  );
}
