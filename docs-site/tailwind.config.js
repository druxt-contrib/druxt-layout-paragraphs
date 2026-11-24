/*
 * The look comes from the preset; this file only says what to scan.
 *
 * The library adds its own components and layouts to this list through the
 * tailwindcss:config hook, so they are not repeated here.
 */
module.exports = {
  presets: [require('@druxt/dui/tailwind-preset')],
  purge: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
}
