import type { PlanEditor, PlanviewRPCSchema } from "@planview/shared/rpc";
import { BrowserView, type BrowserWindow, Utils } from "electrobun/bun";
import { homedir } from "node:os";

import { readConfig, writeConfig } from "./config";
import { readPlanContent, scanPlans } from "./scanner";

let mainWindow: BrowserWindow | undefined;

const EDITOR_APP_NAMES: Record<PlanEditor, string> = {
  cursor: "Cursor",
  vscode: "Visual Studio Code",
};

async function openInEditorApp(filePath: string, editor: PlanEditor): Promise<void> {
  const appName = EDITOR_APP_NAMES[editor];
  const process = Bun.spawn(["open", "-a", appName, filePath], {
    stdout: "ignore",
    stderr: "pipe",
  });
  const exitCode = await process.exited;

  if (exitCode !== 0) {
    const stderr = await new Response(process.stderr).text();
    throw new Error(
      stderr.trim() || `Could not open ${filePath} in ${appName}. Is it installed?`,
    );
  }
}

export function bindMainWindow(window: BrowserWindow): void {
  mainWindow = window;
}

function getMainWindow(): BrowserWindow {
  if (!mainWindow) {
    throw new Error("Main window is not available.");
  }
  return mainWindow;
}

export const planviewRpc = BrowserView.defineRPC<PlanviewRPCSchema>({
  maxRequestTime: 30_000,
  handlers: {
    requests: {
      getConfig: async () => readConfig(),
      setConfig: async (config) => {
        await writeConfig(config);
      },
      pickDirectory: async () => {
        const chosenPaths = await Utils.openFileDialog({
          startingFolder: homedir(),
          canChooseFiles: false,
          canChooseDirectory: true,
          allowsMultipleSelection: false,
        });

        const [firstPath] = chosenPaths.filter(Boolean);
        return firstPath ?? null;
      },
      scanPlans: async () => {
        const config = await readConfig();
        return scanPlans(config);
      },
      readPlanContent: async ({ filePath }) => {
        const content = await readPlanContent(filePath);
        if (!content) {
          throw new Error(`Could not read plan at ${filePath}`);
        }
        return content;
      },
      openFile: async ({ filePath }) => {
        const opened = Utils.openPath(filePath);
        if (!opened) {
          throw new Error(`Could not open ${filePath}`);
        }
      },
      openFileInEditor: async ({ filePath, editor }) => {
        await openInEditorApp(filePath, editor);
      },
      revealInFinder: async ({ filePath }) => {
        Utils.showItemInFolder(filePath);
      },
      toggleWindowZoom: async () => {
        const window = getMainWindow();
        if (window.isMaximized()) {
          window.unmaximize();
        } else {
          window.maximize();
        }
        return window.isMaximized();
      },
    },
  },
});
