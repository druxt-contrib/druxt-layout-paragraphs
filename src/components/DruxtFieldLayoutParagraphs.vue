<template>
  <div v-if="!$fetchState.pending">
    <DruxtEntity
      v-for="paragraph of rootParagraphs"
      :key="paragraph.id"
      :type="paragraph.type"
      :uuid="paragraph.id"
      v-bind="{ ...$attrs }"
    >
      <template
        v-if="isLayout(paragraph)"
        #default="{ entity }"
      >
        <DruxtLayoutParagraph
          :entity="entity"
          :children="getChildren(entity)"
          v-bind="{ ...$attrs }"
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
    paragraphs: [],
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
    /**
     * Root level paragraphs.
     *
     * @return {object[]}
     */
    rootParagraphs: ({ paragraphs, isLayout }) => (paragraphs || []).filter((o) => isLayout(o) || (!isLayout(o) && !(o.attributes.behavior_settings.layout_paragraphs || {}).parent_uuid)),
  },

  methods: {
    /**
     * Returns the child paragraphs of a layout paragraph entity.
     *
     * @param {object} entity - The paragraph layout entity.
     *
     * @return {object[]} - An array of child paragraph entities.
     */
    getChildren(entity) {
      return this.paragraphs.filter(
        (o) =>
          (o.attributes.behavior_settings.layout_paragraphs || {}).parent_uuid ===
          entity.id
      )
    },

    /**
     * Returns true if the provided entity is a layout paragraph.
     *
     * @param {object} entity - The entity.
     *
     * @return {boolean}
     */
    isLayout(entity) {
      return !!(entity.attributes.behavior_settings.layout_paragraphs || {}).layout
    }
  },
}
</script>
