<template>
  <div>
    <!-- The markdown carries its own h1, so the page adds no heading of its own. -->
    <nuxt-content :document="document" />
    <DuiDocFooter :prev="previous" :next="next" />
  </div>
</template>

<script>
import { ordered, sections } from '../nav'

export default {
  layout: 'docs',

  async asyncData({ $content, $config, params, store, error }) {
    const documents = await $content().fetch()
    const list = ordered(documents)
    const index = list.findIndex((o) => o.slug === params.pathMatch)

    if (index === -1) {
      return error({ statusCode: 404, message: 'No such page' })
    }

    // The layout draws both. It cannot reach this page's data on its own,
    // so the page hands them over.
    store.commit('setDocsNav', {
      sections: sections(documents, { demo: $config.docsDemo }),
      toc: list[index].toc,
    })

    const link = (o) => (o ? { text: o.title, to: `/${o.slug}` } : null)

    return {
      document: list[index],
      previous: link(list[index - 1]),
      next: link(list[index + 1]),
    }
  },

  head() {
    return { title: this.document.title }
  },
}
</script>
