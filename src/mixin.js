/**
 * Provides Vue.js properties to render a DruxtLayoutParagraph Wrapper component.
 *
 * @mixin
 *
 * @example @lang vue
 * <script>
 * import { DruxtLayoutParagraphMixin } from 'druxt-layout-paragraphs'
 *
 * export default {
 *   mixins: [DruxtLayoutParagraphMixin],
 * }
 * </script>
 */
const DruxtLayoutParagraphMixin = {
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
     * The Layout Paragraphs Entity JSON:API resource data.
     *
     * @type {object}
     */
    entity: {
      type: Object,
      required: true,
    },
  }
}

export { DruxtLayoutParagraphMixin }
