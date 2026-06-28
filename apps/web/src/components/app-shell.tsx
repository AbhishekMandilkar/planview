import { Input } from "@planview/ui/components/input";
import { Separator } from "@planview/ui/components/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@planview/ui/components/sidebar";
import { TooltipProvider } from "@planview/ui/components/tooltip";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CheckCircle2,
  Clock,
  LayoutList,
  ListFilter,
  Settings,
  Sparkles,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

const SIDEBAR_WIDTH = "13.75rem"; // 220px per PRD
const DETAIL_WIDTH = "17.5rem"; // 280px per PRD

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isSettings = pathname === "/settings";

  return (
    <TooltipProvider>
      <SidebarProvider
        className="h-svh overflow-hidden"
        style={{ "--sidebar-width": SIDEBAR_WIDTH } as CSSProperties}
      >
        <Sidebar collapsible="none" className="border-r border-sidebar-border">
          <div
            className="electrobun-webkit-app-region-drag h-11 shrink-0 border-b border-sidebar-border"
            aria-hidden
          />

          <SidebarContent className="electrobun-webkit-app-region-no-drag">
            <SidebarGroup>
              <SidebarGroupLabel>Views</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={pathname === "/"} render={<Link to="/" />}>
                      <LayoutList />
                      <span>All plans</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<Link to="/" search={{ view: "recent" }} />}>
                      <Clock />
                      <span>Recent</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<Link to="/" search={{ view: "completed" }} />}>
                      <CheckCircle2 />
                      <span>Completed</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <SidebarGroup>
              <SidebarGroupLabel>Tool</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Sparkles />
                      <span>Cursor</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Bot />
                      <span>Claude Code</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>0</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Project</SidebarGroupLabel>
              <SidebarGroupContent>
                <p className="px-2 py-1.5 text-xs text-sidebar-foreground/60">
                  Projects appear after the first scan.
                </p>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="electrobun-webkit-app-region-no-drag border-t border-sidebar-border">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isSettings} render={<Link to="/settings" />}>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex min-h-0 flex-col overflow-hidden">
          <header className="flex h-11 shrink-0 border-b border-border">
            <div className="electrobun-webkit-app-region-drag flex min-w-0 flex-1 items-center px-4">
              <div className="electrobun-webkit-app-region-no-drag flex min-w-0 flex-1 items-center gap-3">
                <h1 className="shrink-0 text-sm font-medium">
                  {isSettings ? "Settings" : "All plans"}
                </h1>
                {!isSettings ? (
                  <>
                    <Input
                      type="search"
                      placeholder="Search plans…"
                      className="h-8 max-w-xs"
                      disabled
                    />
                    <button
                      type="button"
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-none text-muted-foreground hover:bg-muted hover:text-foreground"
                      disabled
                      aria-label="Filter plans"
                    >
                      <ListFilter className="size-4" />
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {!isSettings ? (
              <div className="electrobun-webkit-app-region-drag flex w-[17.5rem] shrink-0 items-center border-l border-border px-4">
                <span className="text-sm font-medium text-muted-foreground">Details</span>
              </div>
            ) : null}
          </header>

          <div className="flex min-h-0 flex-1 flex-row overflow-hidden">
            <div className="min-h-0 min-w-0 flex-1 overflow-auto">{children}</div>

            {!isSettings ? (
              <aside
                className="flex min-h-0 shrink-0 flex-col border-l border-border bg-background"
                style={{ width: DETAIL_WIDTH }}
              >
                <div className="flex flex-1 items-center justify-center p-6">
                  <p className="text-center text-sm text-muted-foreground">
                    Select a plan to view its contents.
                  </p>
                </div>
              </aside>
            ) : null}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

function SidebarSeparator() {
  return <Separator className="mx-0 bg-sidebar-border" />;
}
