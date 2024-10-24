import { defineConfig } from "vite";

// Vite configuration
export default defineConfig({
  // Base public path when served in production (adjust if deploying to a subfolder)
  base: "/vite/",

  // Build options
  build: {
    outDir: "dist", // Output directory for build files
    sourcemap: true, // Enable source maps for easier debugging in production
  },

  // Server configuration (for development mode)

  // Plugin configuration (optional, depending on your project needs)
  plugins: [
    // Add plugins if required (like Vue, React, or any other frameworks)
  ],
});
