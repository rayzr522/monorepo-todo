import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [/\.[jt]sx?$/],
      imports: ["react", "jotai"],
      dirs: ["./src/layouts"],
      defaultExportByFilename: true,
      dts: true,
    }),
  ],
});
