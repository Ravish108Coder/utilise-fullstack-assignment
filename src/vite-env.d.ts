/// <reference types="vite/client" />

// src/vite-env.d.ts
/// <reference types="vite/client" />

declare module '*.svg' {
    const content: string;
    export default content;
  }
  