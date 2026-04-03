import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2018",
    cssCodeSplit: false,
    lib: {
      entry: "src/widget.tsx",
      name: "SimpleChatBubble",
      formats: ["iife", "es"],
      fileName: (format) => `chat-bubble.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "chat-bubble.[ext]",
      },
    },
  },
});
