export {}; // 👈 Ensures this file is treated as a module

declare global {
  interface Window {
    bootstrap: any; // 👈 This tells TypeScript that "bootstrap" exists on window
  }
}
