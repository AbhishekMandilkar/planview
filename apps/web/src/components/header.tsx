import { Link } from "@tanstack/react-router";

import { useAppConfig } from "@/hooks/use-app-config";

export default function Header() {
  const { isLoading, needsOnboarding } = useAppConfig();
  const showNav = !isLoading && !needsOnboarding;

  return (
    <div className="electrobun-webkit-app-region-drag">
      <div className="flex flex-row items-center px-2 py-1 pl-[72px]">
        <nav className="electrobun-webkit-app-region-no-drag flex gap-4 text-lg">
          {showNav ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/settings">Settings</Link>
            </>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">Planview</span>
          )}
        </nav>
      </div>
      <hr />
    </div>
  );
}
