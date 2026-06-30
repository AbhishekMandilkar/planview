import { Button } from "@planview/ui/components/button";

import { GITHUB_RELEASES_URL } from "@/lib/routes";

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="text-sm font-semibold tracking-tight">Planbase</span>
        <Button variant="outline" size="sm" render={<a href={GITHUB_RELEASES_URL} />}>
          Download
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <div className="max-w-lg space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            All your agent plans in one place
          </h1>
          <p className="text-sm leading-6 text-muted-foreground text-balance sm:text-base">
            Planbase scans your machine for markdown plans from Cursor and Claude Code, then lets
            you browse, search, and open them without digging through folders.
          </p>
          <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
            <Button size="lg" render={<a href={GITHUB_RELEASES_URL} />}>
              Download for macOS
            </Button>
            <p className="text-xs text-muted-foreground">Local app. Your files never leave your Mac.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
