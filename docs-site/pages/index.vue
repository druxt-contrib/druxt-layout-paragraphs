<template>
  <div>
    <!--
      The landing page is the repository's README. Everything a reader needs
      first - what the module does, the screenshot, the features, the quick
      start - is already written there for the reader arriving from npm or
      GitHub, and a second copy here would be a second thing to keep true.
    -->
    <NuxtContent :document="document" />
  </div>
</template>

<script>
import { sections } from '../nav'

export default {
  layout: 'docs',

  async asyncData({ $content, $config, store, error }) {
    const documents = await $content().fetch()
    const document = documents.find((candidate) => candidate.slug === 'index')
    if (!document)
      return error({ statusCode: 404, message: 'No README to show' })

    store.commit('setDocsNav', {
      sections: sections(documents, { demo: $config.docsDemo }),
      toc: document.toc || [],
    })

    return { document }
  },

  computed: {
    title: ({ $config }) => $config.docsTitle,
  },

  head() {
    return {
      title: this.title,
      // The landing page is the site, so it carries the site's name alone.
      // The template appends that name to every other page's title, and
      // without this the landing page is named twice over.
      titleTemplate: '%s',
    }
  },
}
</script>
