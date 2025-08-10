import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';
import netlify from '@astrojs/netlify';
import pagefind from 'astro-pagefind'; // ✅ tambahkan ini
import { spectreDark } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

const config = defineConfig({
  site: 'https://baracarlo.netlify.app',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'b4r',
      openGraph: {
        home: {
          title: "b4r's site",
          description: 'Fase Rais Baradika - Personal website and blog',
        },
        blog: {
          title: 'Blog',
          description: 'News and guides for Spectre.'
        },
        projects: {
          title: 'Projects'
        }
      }
    }),
    pagefind({
      entrySelector: 'main', // ✅ penting, biar indexing jalan
    })
  ],
  adapter: netlify()
});

export default config;
