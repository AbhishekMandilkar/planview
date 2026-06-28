import { createFileRoute } from "@tanstack/react-router";

import Loader from "@/components/loader";
import { Onboarding } from "@/components/onboarding";
import { useAppConfig } from "@/hooks/use-app-config";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { isLoading, needsOnboarding, projectRoots } = useAppConfig();

  if (isLoading) {
    return (
      <div className="flex min-h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (needsOnboarding) {
    return <Onboarding />;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm text-muted-foreground">No plans found yet.</p>
      <p className="mt-1 max-w-sm text-xs text-muted-foreground/80">
        Scanning {projectRoots.length} project folder{projectRoots.length === 1 ? "" : "s"}. Plan
        cards will appear here once the scanner is wired up.
      </p>
    </div>
  );
}
