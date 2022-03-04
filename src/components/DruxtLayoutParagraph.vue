<script>
import DruxtModule from 'druxt/dist/components/DruxtModule.vue'

export default {
  name: 'DruxtLayoutParagraph',

  extends: DruxtModule,

  props: {
    entity: {
      type: Object,
      required: true,
    },
  },

  druxt: {
    /**
     * Provide component options using the layout name.
     */
    componentOptions: ({ entity }) => [
      [(((((entity || {}).attributes || {}).behavior_settings || {}).layout_paragraphs || {}).layout || '').replace('layout_', '')],
      ['default'],
    ],

    /**
     * Provide the entity as a prop.
     */
    propsData: ({ entity }) => ({ entity }),
  },
}
</script>
