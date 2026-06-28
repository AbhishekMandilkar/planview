import { isDesktop } from "@/lib/desktop";

export function initDisablePinchZoom(): void {
  if (!isDesktop()) {
    return;
  }

  const blockPinchZoom = (event: Event) => {
    event.preventDefault();
  };

  window.addEventListener("gesturestart", blockPinchZoom, { passive: false });
  window.addEventListener("gesturechange", blockPinchZoom, { passive: false });
  window.addEventListener("gestureend", blockPinchZoom, { passive: false });

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    },
    { passive: false },
  );
}
