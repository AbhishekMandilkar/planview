export const APP_HOME = "/app";
export const APP_SETTINGS = "/app/settings";

export function isAppHomePath(pathname: string): boolean {
  return pathname === APP_HOME || pathname === `${APP_HOME}/`;
}

export const GITHUB_RELEASES_URL =
  "https://github.com/AbhishekMandilkar/planview/releases/latest";
