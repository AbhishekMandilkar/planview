import { Button } from "@planview/ui/components/button";
import { ArrowRight } from "lucide-react";

import { GITHUB_RELEASES_URL } from "@/lib/routes";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M512 0C229.12 0 0 229.12 0 512c0 226.56 146.56 417.92 350.08 485.76 25.6 4.48 35.2-10.88 35.2-24.32 0-12.16-.64-52.48-.64-95.36-128.64 23.68-161.92-31.36-172.16-60.16-5.76-14.72-30.72-60.16-52.48-72.32-17.92-9.6-43.52-33.28-.64-33.92 40.32-.64 69.12 37.12 78.72 52.48 46.08 77.44 119.68 55.68 149.12 42.24 4.48-33.28 17.92-55.68 32.64-68.48-113.92-12.8-232.96-56.96-232.96-252.8 0-55.68 19.84-101.76 52.48-137.6-5.12-12.8-23.04-65.28 5.12-135.68 0 0 42.88-13.44 140.8 52.48 40.96-11.52 84.48-17.28 128-17.28s87.04 5.76 128 17.28c97.92-66.56 140.8-52.48 140.8-52.48 28.16 70.4 10.24 122.88 5.12 135.68 32.64 35.84 52.48 81.28 52.48 137.6 0 196.48-119.68 240-233.6 252.8 18.56 16 34.56 46.72 34.56 94.72 0 68.48-.64 123.52-.64 140.8 0 13.44 9.6 29.44 35.2 24.32C877.44 929.92 1024 737.92 1024 512 1024 229.12 794.88 0 512 0"
      />
    </svg>
  );
}

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col bg-zinc-50 text-zinc-900">
      <header className="flex items-center justify-between px-8 py-6 md:px-12 lg:px-16">
        <span className="motion-safe:animate-fade-up text-sm font-medium tracking-tight text-zinc-900">
          Planbase
        </span>
        <a
          href="https://github.com/AbhishekMandilkar/planview"
          className="motion-safe:animate-fade-up text-zinc-400 transition-colors duration-200 hover:text-zinc-900 [animation-delay:60ms]"
        >
          <GithubIcon className="size-5" />
        </a>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col justify-center px-8 pb-24 pt-12 md:px-12 md:pb-32 md:pt-16 lg:px-16 lg:pb-40 lg:pt-20">
          <div className="mx-auto w-full max-w-3xl">
            {/* Eyebrow */}
            <p className="motion-safe:animate-fade-up mb-8 text-sm text-zinc-500 [animation-delay:80ms] md:mb-10 md:text-base">
              Your AI plans are scattered everywhere.
            </p>

            {/* Headline */}
            <h1 className="motion-safe:animate-fade-up text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 [animation-delay:160ms] sm:text-5xl md:text-6xl">
              Find any plan
              <br />
              from two weeks ago
              <br />
              <span className="text-zinc-400">in two seconds.</span>
            </h1>

            {/* Body */}
            <p className="motion-safe:animate-fade-up mt-8 max-w-lg text-base leading-relaxed text-zinc-500 [animation-delay:240ms] md:mt-10 md:text-lg">
              Planbase indexes every AI agent plan on your Mac.
              Search by project, filter by tool, open in your editor.
            </p>

            {/* CTA */}
            <div className="motion-safe:animate-fade-up mt-10 [animation-delay:320ms] md:mt-12">
              <Button
                size="lg"
                className="group h-11 gap-2 px-5 text-sm active:scale-[0.97] active:duration-60"
                style={{ transition: "transform 160ms cubic-bezier(0.23, 1, 0.32, 1)" }}
                render={<a href={GITHUB_RELEASES_URL} />}
              >
                Download for macOS
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }} />
              </Button>
              <p className="mt-4 text-sm text-zinc-400">
                Free, 4MB, local-only
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-zinc-200 px-8 py-20 md:px-12 md:py-28 lg:px-16 lg:py-32">
          <div className="mx-auto w-full max-w-3xl">
            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
              {[
                {
                  title: "Indexed",
                  body: "Watches Cursor, Claude Code, and project folders automatically.",
                },
                {
                  title: "Searchable",
                  body: "Full-text search across all your plans. Filter by agent or project.",
                },
                {
                  title: "Private",
                  body: "Everything stays on your machine. No cloud, no sync, no telemetry.",
                },
              ].map(({ title, body }, i) => (
                <div
                  key={title}
                  className="motion-safe:animate-fade-up"
                  style={{ animationDelay: `${400 + i * 80}ms` }}
                >
                  <p className="text-sm font-medium text-zinc-900">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-8 py-16 md:px-12 md:py-20 lg:px-16">
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-sm leading-relaxed text-zinc-500">
              Built by a developer who got tired of running{" "}
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-xs text-zinc-700">
                cd ~/.cursor/plans && ls
              </code>{" "}
              every day.
            </p>
          </div>
        </section>
      </main>

      <footer className="px-8 py-6 md:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-xs text-zinc-400">Planbase</p>
        </div>
      </footer>
    </div>
  );
}
