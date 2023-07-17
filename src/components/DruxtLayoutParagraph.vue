<script>
import DruxtModule from 'druxt/dist/components/DruxtModule.vue'

/**
 * The DruxtLayoutParagraph component renders a Paragraphs in regions as defined
 * by the Drupal Layout Paragraph module and content.
 *
 * @example @lang vue
 * <DruxtLayoutParagraph
 *   :children="children"
 *   :entity="entity"
 * />
 *
 * @example <caption>DruxtLayoutParagraph Wrapper component boilerplate</caption> @lang vue
 * <template>
 *   <DruxtDebug :json="{ children, entity }" />
 * </template>
 *
 * <script>
 * import { DruxtLayoutParagraphMixin } from 'druxt-layout-paragraphs'
 * export default {
 *   mixins: [DruxtLayoutParagraphMixin]
 * }
 *
 * @example <caption>DruxtLayoutParagraph with template injection</caption> @lang vue
 * <DruxtLayoutParagraph children="" entity="">
 *   <template #default="{ children, entity }">
 *     <!-- Do whatever you want here -->
 *     <DruxtDebug :json="{ children, entity }" />
 *   </template>
 * </DruxtLayoutParagraph>
 */
export default {
  name: 'DruxtLayoutParagraph',

  extends: DruxtModule,

  /** */
  props: {
    /**
     * An array of children paragraph entities.
     *
     * @type {object[]}
     */
    children: {
      type: Array,
      default: undefined,
    },

    /**
     * The Layout Paragraphs entity JSON:API resource data.
     *
     * @type {object}
     */
    entity: {
      type: Object,
      required: true,
    },
  },

  /** DruxtModule settings */
  druxt: {
    /**
     * Provide component options using the layout name.
     *
     * @param {object} context - The module component ViewModel.
     * @returns {ComponentOptions}
     */
    componentOptions: ({ entity }) => [
      [(((((entity || {}).attributes || {}).behavior_settings || {}).layout_paragraphs || {}).layout || '').replace('layout_', '').replace(':', '_')],
      ['default'],
    ],

    /**
     * Provides propsData for the DruxtWrapper.
     *
     * @param {object} context - The module component ViewModel.
     * @returns {PropsData}
     */
    propsData: ({ children, entity }) => ({ children, entity }),

    /**
     * Provides the scoped slots object for the Module render function.
     *
     * A scoped slot is provided for region with paragraphs present.
     *
     * Additionally, the `default` slot will render all regions.
     *
     * @example <caption>DruxtLayoutParagraphs**Layout**.vue</caption> @lang vue
     * <template>
     *   <div>
     *     <div class="top"><slot name="top" /></div>
     *     <div class="middle">
     *       <div class="first"><slot name="first" /></div>
     *       <div class="second"><slot name="second" /></div>
     *     </div>
     *     <div class="bottom"><slot name="bottom" /></div>
     *   </div>
     * </template>
     *
     * @return {ScopedSlots} The Scoped slots object.
     */
    slots(h) {
      const slots = {}

      // Determine the available regions based off the children.
      const regions = (this.children || []).map((o) => o.attributes.behavior_settings.layout_paragraphs.region).filter((str, index, map) => map.indexOf(str) === index)

      // Create a slot for all available regions.
      regions.forEach((region) => {
        const children = this.children.filter((o) => o.attributes.behavior_settings.layout_paragraphs.region === region)
        slots[region] = (attrs) => h('div', children.map((o) => h('DruxtEntity',
          {
            attrs,
            props: {
              type: o.type,
              uuid: o.id
            }
          }
        )))
      })

      // If no default region, render all available region slots.
      if (!slots.default) {
        slots.default = (attrs) => h('div', regions.map((region) => slots[region](attrs)))
      }

      return slots
    }
  },
}

/**
 * Provides the available naming options for the Wrapper component.
 *
 * @typedef {array[]} ComponentOptions
 *
 * @example @lang js
 * [
 *   'DruxtLayoutParagraph[Layout]',
 *   'DruxtLayoutParagraphDefault',
 * ]
 *
 * @example <caption>Two column</caption> @lang js
 * [
 *   'DruxtLayoutParagraphTwocol',
 *   'DruxtLayoutParagraphDefault',
 * ]
 */

/**
 * Provides property data for use in the Wrapper component.
 *
 * @typedef {object} PropsData
 * @param {object[]} children - An array of children entities.
 * @param {object} entity - The Drupal Entity JSON:API resource data.
 *
 * @example @lang js
 * {
 *   children: [{
 *     attributes: {},
 *     id: 'fdc68f3a-1e07-43f8-9c96-c6c2224c4727',
 *     links: {},
 *     relationships: {},
 *     type: 'paragraph--text,
 *   }],
 *   entity: {
 *     attributes: {},
 *     id: '132fc071-804f-4314-a123-0c3587f2574a',
 *     links: {},
 *     relationships: {},
 *     type: 'paragraph--section,
 *   },
 * }
 */

/**
 * Provides scoped slots for use in the Wrapper component.
 *
 * @typedef {object} ScopedSlots
 * @param {function} * - Slot per region.
 * @param {function} default - All regions.
 *
 * @example <caption>DruxtLayoutParagraph**Layout**.vue</caption> @lang vue
 * <template>
 *   <div>
 *     <slot name="default" />
 *     <slot :name="region_name" />
 *   </div>
 * </template>
 */
</script>
