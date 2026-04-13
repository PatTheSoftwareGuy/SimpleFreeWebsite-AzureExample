import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const fastBuild = process.env.CHAT_BUBBLE_FAST_BUILD === "1";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  build: {
    target: "es2018",
    minify: fastBuild ? false : "esbuild",
    cssCodeSplit: false,
    lib: {
      entry: "src/widget.tsx",
      name: "SimpleChatBubble",
      formats: fastBuild ? ["iife"] : ["iife", "es"],
      fileName: (format) => `chat-bubble.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "chat-bubble.[ext]",
      },
    },
  },
});
