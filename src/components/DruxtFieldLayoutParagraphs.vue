<template>
  <div v-if="!$fetchState.pending">
    <DruxtEntity
      v-for="layout of layouts"
      :key="`layout-${layout.uuid}`"
      v-bind="layout"
    >
      <template #default="{ entity }">
        <DruxtLayoutParagraph
          :entity="entity"
          :children="getChildren(entity)"
        />
      </template>
    </DruxtEntity>
  </div>

  <div v-else />
</template>

<script>
import { DruxtFieldMixin } from 'druxt-entity'

export default {
  mixins: [DruxtFieldMixin],

  data: () => ({
    paragraphs: undefined,
  }),

  async fetch() {
    let { href } = this.model.links.related

    // Use API proxy if enabled.
    if ((this.$druxt.settings.proxy || {}.api)) {
      href = href.replace(this.$druxt.settings.baseUrl, '')
    }

    const { data } = await this.$druxt.axios.get(href)
    this.paragraphs = data.data
  },

  computed: {
    layouts: ({ paragraphs }) => paragraphs.filter((o) => o.attributes.behavior_settings.layout_paragraphs.layout)
      .map((o) => ({
        type: o.type,
        uuid: o.id
      }))
  },

  methods: {
    getChildren(entity) {
      return this.paragraphs.filter(
        (o) =>
          o.attributes.behavior_settings.layout_paragraphs.parent_uuid ===
          entity.id
      )
    },
  },
}
</script>
