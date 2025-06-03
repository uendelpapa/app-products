import * as React from "react";

// 1. import `HeroUIProvider` component
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider } from "@/components/theme/theme-provider";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <HeroUIProvider className="flex w-full h-full justify-center p-2 gap-2 ">
      <ThemeProvider storageKey="caffe-mania-theme" defaultTheme="dark">
        <ToastProvider />
        {children}
      </ThemeProvider>
    </HeroUIProvider>
  );
}
