import type { AppConfig } from "./config";
import type { PlanContent } from "./plan-content";
import type { Plan } from "./plan";

export type PlanEditor = "cursor" | "vscode";

export type PlanviewRPCSchema = {
  bun: {
    requests: {
      getConfig: { params: void; response: AppConfig };
      setConfig: { params: AppConfig; response: void };
      pickDirectory: { params: void; response: string | null };
      scanPlans: { params: void; response: Plan[] };
      readPlanContent: { params: { filePath: string }; response: PlanContent };
      openFile: { params: { filePath: string }; response: void };
      openFileInEditor: {
        params: { filePath: string; editor: PlanEditor };
        response: void;
      };
      revealInFinder: { params: { filePath: string }; response: void };
      toggleWindowZoom: { params: void; response: boolean };
    };
    messages: Record<string, never>;
  };
  webview: {
    requests: Record<string, never>;
    messages: Record<string, never>;
  };
};
