import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/ts/app/app.tsx"],
            refresh: true,
        }),
        react(),
        // tsconfigPaths(),
    ],
    // resolve: {
    //     alias: {
    //         "@": "/resources/ts",
    //     },
    // },
});
