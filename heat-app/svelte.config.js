import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      // default options are shown
      pages: "build",
      assets: "build",
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    // Configure the base path for deployment
    paths: {
      base: '/Projekt/hitzemessen',
    },
    // This enables static site generation
    prerender: {
      entries: ["*"],
    },
  },
};

export default config;
