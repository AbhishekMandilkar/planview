import { createFileRoute, redirect } from "@tanstack/react-router";

import { LandingPage } from "@/components/landing-page";
import { isDesktop } from "@/lib/desktop";
import { APP_HOME } from "@/lib/routes";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (isDesktop()) {
      throw redirect({ to: APP_HOME });
    }
  },
  component: LandingPage,
});
