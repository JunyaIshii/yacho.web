import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/ts/app/app.tsx"],
            refresh: true,
        }),
        react({
            include: /\.tsx$/,
        }),
        // tsconfigPaths(),
    ],
    build: {
        manifest: true,
        outDir: "public/build",
        assetsDir: ".",
        rollupOptions: {
            input: "resources/ts/app/app.tsx",
            output: {
                entryFileNames: "assets/[name]-[hash].js",
                chunkFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]",
            },
        },
    },
    // resolve: {
    //     alias: {
    //         "@": "/resources/ts",
    //     },
    // },
});
