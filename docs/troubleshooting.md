# Troubleshooting

In development, a Druxt component that cannot render shows its debug message
in place, naming the components it would have accepted. Production shows
nothing.

- [The field](#the-field)
- [A layout](#a-layout)
- [Children](#children)

## The field

### The field renders as something else

The view display still has its old formatter. Druxt picks a field's component
from the formatter's machine name, so the field has to be set to **Layout
Paragraphs** for this module's component to be the one used.
[Drupal setup](drupal-setup.md#the-field-formatter) has where.

This is the failure with no error attached to it: the field renders through
whichever formatter is set, so the page looks built and the layout is simply
gone.

### The field renders nothing at all

Druxt Entity is not installed. The field's component is a Druxt Entity field
wrapper, and nothing looks for it otherwise:

```js
buildModules: ['druxt-entity', 'druxt-layout-paragraphs']
```

### The field renders an empty element

The request for the paragraphs did not return them. The component follows the
field's `related` link in its own request, and renders what came back, so an
error there leaves the field empty rather than failing the page. Look for the
request in the browser's network panel, or in the server log for a page
rendered on the server.

The likeliest cause is that the role the site reads as cannot view the
paragraphs. [Drupal setup](drupal-setup.md#permissions) covers it.

## A layout

### A layout renders nothing

There is no component for it, and no `DruxtLayoutParagraphDefault` to fall
back to. In development Druxt's debug message names what it looked for. Write
one, as [Theming](theming.md#the-component-name) describes, or write the
default and cover every layout at once.

### A wrapper is not used

The name Nuxt registered it under is not the name Druxt looked for. Nuxt drops
a folder name the file name repeats, so
`components/druxt/layout-paragraph/DruxtLayoutParagraphTwocol.vue` registers
as `DruxtLayoutParagraphTwocol` and so does
`components/druxt/layout-paragraph/Twocol.vue`, while
`components/DruxtLayoutParagraphTwocol.vue` does too and
`components/layout-paragraph/Twocol.vue` does not.

Check the generated `.nuxt/components/index.js`, which lists every component
and the name it was registered under.

A layout whose machine name is not the obvious one is the other half of this.
`layout_content__custom_layout:custom_layout` is
`DruxtLayoutParagraphContentCustomLayoutCustomLayout`, not
`DruxtLayoutParagraphCustomLayout`:
[the component name](theming.md#the-component-name) has the rule.

### The wrapper renders, but its regions are empty

The slot names are the region machine names from the layout plugin, not the
labels. A `<slot name="left" />` for a layout whose regions are `first` and
`second` renders nothing. The regions a layout has are on its plugin in
Drupal, and the regions in use are readable from the children:
`children[].attributes.behavior_settings.layout_paragraphs.region`.

### `children` and `entity` are empty, or appear as HTML attributes

The component does not use `DruxtLayoutParagraphMixin`, so neither is declared
as a prop and Vue puts both on the root element instead. Add the mixin, as
[Theming](theming.md#what-a-wrapper-is-given) shows.

### `Cannot read properties of undefined (reading 'layout_paragraphs')`

A paragraph in the field has no `behavior_settings`. Every paragraph type in
the field needs the **Layout Paragraphs** behaviour available on it, even the
ones that only hold content, because the module reads the setting on each
paragraph to decide where it goes.

## Children

### A child renders outside its layout

Its `parent_uuid` names a paragraph that is not in this field, so the module
has nothing to put it inside and renders it at the top level. This happens to
content moved between fields in Drupal, and is fixed by opening the layout in
Drupal and saving it.

### A child renders twice

It is in the field twice. The module renders the field's paragraphs as the
field lists them.

### A child's own fields render wrongly

That is Druxt Entity rendering the paragraph, not this module. The paragraph is
rendered with `DruxtEntity`, so its view display, its mode and its own field
wrappers decide what it looks like. The Druxt Entity documentation covers them.
