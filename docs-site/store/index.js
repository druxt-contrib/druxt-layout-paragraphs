/*
 * Nuxt 2 only creates a Vuex store when this directory exists, and
 * druxt-ui-docs needs one: it is where a page leaves the navigation and the
 * table of contents for the layout, and the only state nuxt generate writes
 * into each page's payload. The module adds everything else.
 */
export const state = () => ({})
