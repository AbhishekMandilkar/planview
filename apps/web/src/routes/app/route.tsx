import { createFileRoute, redirect } from "@tanstack/react-router";

import { AppLayout } from "@/components/app-layout";
import { isDesktop } from "@/lib/desktop";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    if (!isDesktop()) {
      throw redirect({ to: "/" });
    }
  },
  component: AppLayout,
});
