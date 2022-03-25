<script>
import DruxtModule from 'druxt/dist/components/DruxtModule.vue'

export default {
  name: 'DruxtLayoutParagraph',

  extends: DruxtModule,

  props: {
    children: {
      type: Array,
      default: undefined,
    },

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
    propsData: ({ children, entity }) => ({ children, entity }),

    slots(h) {
      const slots = {}

      // Determine the available regions based off the children.
      const regions = (this.children || []).map((o) => o.attributes.behavior_settings.layout_paragraphs.region).filter((str, index, map) => map.indexOf(str) === index)

      // Create a slot for all available regions.
      regions.forEach((region) => {
        const children = this.children.filter((o) => o.attributes.behavior_settings.layout_paragraphs.region === region)
        slots[region] = () => h('div', children.map((o) => h('DruxtEntity',
          {
            props: {
              type: o.type,
              uuid: o.id
            }
          }
        )))
      })

      // If no default region, render all available region slots.
      if (!slots.default) {
        slots.default = () => h('div', regions.map((region) => slots[region]()))
      }

      return slots
    }
  },
}
</script>
