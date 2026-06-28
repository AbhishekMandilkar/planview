import { Outlet } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

import Loader from "@/components/loader";
import Header from "@/components/header";
import { useAppConfig } from "@/hooks/use-app-config";
import { usePlansScan } from "@/hooks/use-plans-scan";

const AppShell = lazy(() =>
  import("@/components/app-shell").then((module) => ({ default: module.AppShell })),
);

export function AppLayout() {
  const { isLoading, needsOnboarding } = useAppConfig();
  const showShell = !isLoading && !needsOnboarding;

  usePlansScan(showShell);

  if (!showShell) {
    return (
      <div className="grid h-svh grid-rows-[auto_1fr]">
        <Header />
        <Outlet />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-svh items-center justify-center">
          <Loader />
        </div>
      }
    >
      <AppShell>
        <Outlet />
      </AppShell>
    </Suspense>
  );
}
