import * as React from "react";

// 1. import `HeroUIProvider` component
import { HeroUIProvider, ToastProvider } from "@heroui/react";

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <HeroUIProvider className="">
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
}
