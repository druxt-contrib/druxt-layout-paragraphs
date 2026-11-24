import { ORDER } from './nav'

/*
 * The documentation site for this module.
 *
 * Everything about how it looks comes from @druxt/dui. What is left here
 * is this module's own name, where its pages are, and the base path GitHub
 * Pages serves it from.
 */

// GitHub Pages serves a project site from /<repository>/, so every asset and
// route has to be built under that prefix. It is read from the environment
// rather than written down, because a value written down is a value that is
// wrong on the next repository that copies this file.
const repository = (process.env.GITHUB_REPOSITORY || '').split('/')[1]
const base = repository ? `/${repository}/` : '/'

export default {
  target: 'static',
  ssr: true,

  router: { base },

  publicRuntimeConfig: {
    docsTitle: 'Druxt Layout Paragraphs',
    docsTagline: 'Drupal Layout Paragraphs fields, rendered in a Druxt site.',
    docsRepoUrl: 'https://github.com/druxt-contrib/druxt-layout-paragraphs',
    docsBadges: [
      {
        text: 'npm',
        href: 'https://www.npmjs.com/package/druxt-layout-paragraphs',
      },
    ],

    /*
     * The links every Druxt site shows, plus this module's own source. A site
     * with a Drupal backend fills the same store state from its menu instead.
     */
    docsLinks: [
      {
        text: 'GitHub',
        icon: 'github',
        href: 'https://github.com/druxt-contrib/druxt-layout-paragraphs',
      },
      { text: 'Discord', icon: 'discord', href: 'https://discord.druxtjs.org' },
    ],

    /*
     * No docsDemo, and so no live example link. The example needs a Drupal
     * backend that DDEV brings up, which StackBlitz cannot run, so a link
     * from here would open a container that never serves the site. The
     * example's own README says how to run it locally instead.
     */
  },

  head: {
    titleTemplate: '%s - Druxt Layout Paragraphs',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    script: [
      {
        // The theme is set before the first paint, so a reader who prefers
        // dark does not see a white page first.
        hid: 'druxt-theme-init',
        innerHTML:
          "(function(){try{var k='druxt-color-mode';var p=localStorage.getItem(k)||'system';var v=p==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;document.documentElement.setAttribute('data-theme',v)}catch(e){}})()",
      },
    ],
    __dangerouslyDisableSanitizersByTagID: {
      'druxt-theme-init': ['innerHTML'],
    },
  },

  // No @nuxt/postcss8: Nuxt 2.18 is already on postcss 8, and the module
  // drags in css-loader 5, whose webpack 5 is hoisted over the webpack 4
  // that Nuxt 2 builds with. The build then fails inside
  // html-webpack-plugin, nowhere near the cause.
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    dataValue: 'theme',
    storageKey: 'druxt-color-mode',
  },

  // @druxt/dui before @nuxt/content, deliberately. Content parses every
  // file while it starts up, so a hook registered by a module listed after it
  // is registered too late and never runs.
  modules: [
    [
      '@druxt/dui',
      {
        // Where a link that leaves docs/ points instead: the same file on
        // GitHub, which is the only place the site can send a reader for it.
        repoUrl: 'https://github.com/druxt-contrib/druxt-layout-paragraphs',
        gitRef: '0.x',
        // Where this site is published, for the sitemap and llms.txt. It has
        // no default: a build's own environment could answer it, and that
        // answer goes wrong the moment a custom domain is set.
        siteUrl: 'https://contrib.druxtjs.org',
        order: ORDER,
      },
    ],
    '@nuxt/content',
  ],

  generate: { fallback: '404.html' },
}
