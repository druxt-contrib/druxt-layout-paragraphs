<template>
  <div v-if="!$fetchState.pending">
    <DruxtEntity
      v-for="section of items.filter((o) => o.type === 'paragraph--section')"
      :key="`section-${section.uuid}`"
      v-bind="section"
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
    const { data } = await this.$druxt.axios.get(this.model.links.related.href)
    this.paragraphs = data.data
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
