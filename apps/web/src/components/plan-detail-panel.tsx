import type { Plan } from "@planview/shared/plan";
import type { PlanEditor } from "@planview/shared/rpc";
import { Button } from "@planview/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@planview/ui/components/dropdown-menu";
import { ScrollArea } from "@planview/ui/components/scroll-area";
import { Skeleton } from "@planview/ui/components/skeleton";
import { ChevronDown, FolderOpen } from "lucide-react";
import { memo, useCallback } from "react";
import { toast } from "sonner";

import { CursorIcon } from "@/components/icons/cursor-icon";
import { VscodeIcon } from "@/components/icons/vscode-icon";
import { PlanMarkdown } from "@/components/plan-markdown";
import { TitleBarStrip } from "@/components/title-bar-strip";
import { usePlanContent } from "@/hooks/use-plan-content";
import { openFileInEditor, revealInFinder } from "@/lib/desktop";
import { usePlansStore } from "@/stores/plans-store";

type PlanDetailPanelProps = {
  plan: Plan | null;
};

function DetailSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  );
}

function PlanDetailTitleActions({ plan }: { plan: Plan }) {
  const handleOpenInEditor = useCallback(
    async (editor: PlanEditor) => {
      try {
        await openFileInEditor(plan.filePath, editor);
      } catch (openError: unknown) {
        toast.error(openError instanceof Error ? openError.message : "Could not open this plan.");
      }
    },
    [plan.filePath],
  );

  const handleRevealInFinder = useCallback(async () => {
    try {
      await revealInFinder(plan.filePath);
    } catch (revealError: unknown) {
      toast.error(
        revealError instanceof Error ? revealError.message : "Could not reveal this plan.",
      );
    }
  }, [plan.filePath]);

  return (
    <div className="electrobun-webkit-app-region-no-drag flex shrink-0 items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button type="button" variant="outline" size="sm">
              Open
              <ChevronDown className="opacity-60" />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => void handleOpenInEditor("cursor")}>
            <CursorIcon className="size-3.5" />
            Cursor
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => void handleOpenInEditor("vscode")}>
            <VscodeIcon className="size-3.5" />
            VS Code
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Show in Finder"
        onClick={() => void handleRevealInFinder()}
      >
        <FolderOpen />
      </Button>
    </div>
  );
}

export const PlanDetailPanel = memo(function PlanDetailPanel({ plan }: PlanDetailPanelProps) {
  const lastScannedAt = usePlansStore((state) => state.lastScannedAt);
  const { content, isLoading, error, reload } = usePlanContent(plan, lastScannedAt);

  if (!plan) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <TitleBarStrip />
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-muted-foreground">
            Select a plan to view its contents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TitleBarStrip className="min-w-0 flex-row items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 truncate text-sm font-semibold leading-snug">{plan.title}</h2>
        <PlanDetailTitleActions plan={plan} />
      </TitleBarStrip>

      <ScrollArea className="min-h-0 flex-1">
        {isLoading ? <DetailSkeleton /> : null}
        {!isLoading && error ? (
          <div className="space-y-3 p-4">
            <p className="text-sm text-destructive">{error}</p>
            <Button type="button" variant="outline" size="sm" onClick={reload}>
              Retry
            </Button>
          </div>
        ) : null}
        {!isLoading && !error && content ? (
          <div className="p-4">
            <PlanMarkdown markdown={content.body} />
          </div>
        ) : null}
      </ScrollArea>
    </div>
  );
});
