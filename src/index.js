import { join } from 'path'

/**
 * The Nuxt.js module function.
 *
 * Installs the module functionality in a Nuxt application.
 *
 * @type {Function}
 * @exports default
 * @name DruxtEntityNuxtModule
 */
// eslint-disable-next-line no-unused-vars
const DruxtLayoutParagraphNuxtModule = function (moduleOptions = {}) {
  // Register components directories.
  this.nuxt.hook('components:dirs', dirs => {
    dirs.push({ path: join(__dirname, 'components') })
  })
}
export default DruxtLayoutParagraphNuxtModule

/**
 * Vue.js mixin for DruxtLayoutParagraph Wrapper components.
 *
 * @type {object}
 * @exports DruxtLayoutParagraphMixin
 * @see {@link ./mixin|DruxtLayoutParagraphMixin}
 */
 export { DruxtLayoutParagraphMixin } from './mixin'
