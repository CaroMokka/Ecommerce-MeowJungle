export {}; // Ensures this file is treated as a module

declare global {
  interface Window {
    bootstrap: {
      Offcanvas: {
        getInstance: (
          element: Element | null
        ) => { hide: () => void } | null;
      };
    };
  }
}
