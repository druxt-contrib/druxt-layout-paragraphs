# Theming

A layout reaches the site as a component to write. This page covers what it is
called, what it is given, and where its children appear.

- [The component name](#the-component-name)
- [Naming the file](#naming-the-file)
- [The wrapper's props](#the-wrappers-props)
- [Regions](#regions)
- [The default region](#the-default-region)
- [A template instead of a component](#a-template-instead-of-a-component)
- [The field itself](#the-field-itself)

## The component name

The name comes from the layout's machine name in Drupal. The module takes it
off the paragraph, drops the first `layout_`, turns the first `:` into `_`, and
Druxt pascal-cases what is left behind `DruxtLayoutParagraph`:

| Layout in Drupal                              | Component                                             |
| --------------------------------------------- | ----------------------------------------------------- |
| `layout_onecol`                               | `DruxtLayoutParagraphOnecol`                          |
| `layout_twocol`                               | `DruxtLayoutParagraphTwocol`                          |
| `layout_twocol_bricks`                        | `DruxtLayoutParagraphTwocolBricks`                    |
| `layout_threecol_25_50_25`                    | `DruxtLayoutParagraphThreecol255025`                  |
| `layout_content__custom_layout:custom_layout` | `DruxtLayoutParagraphContentCustomLayoutCustomLayout` |

The last one is worth reading twice. Only the first `layout_` is dropped, so
the one inside the name stays, and both halves of the plugin id end up in the
component's name.

`DruxtLayoutParagraphDefault` is tried for any layout with no component of its
own, so one component can cover every layout a site does not style
individually. With neither, Druxt's debug message names the components it would
have accepted, in development.

## Naming the file

Nuxt drops a folder name that the file name repeats, so the folders are part
of the name only once:

```text
components/druxt/layout-paragraph/Twocol.vue   → DruxtLayoutParagraphTwocol
components/druxt/layout-paragraph/Default.vue  → DruxtLayoutParagraphDefault
```

A component registered under the wrong name is not used, and nothing says so.
[Troubleshooting](troubleshooting.md#a-wrapper-is-not-used) has how to check
the name Nuxt gave it.

## The wrapper's props

`DruxtLayoutParagraphMixin` declares the two props the module passes:

```vue
<template>
  <div>
    <slot name="top" />
    <slot name="first" />
    <slot name="second" />
  </div>
</template>

<script>
import { DruxtLayoutParagraphMixin } from 'druxt-layout-paragraphs'

export default {
  mixins: [DruxtLayoutParagraphMixin],
}
</script>
```

- `entity`: the layout paragraph's own JSON:API resource, so
  `entity.attributes.behavior_settings.layout_paragraphs.config` holds the
  label and whatever else the layout stores.
- `children`: the paragraphs inside it, as JSON:API resources.

Without the mixin, neither is declared as a prop, and Vue puts both on the
component's root element as attributes instead.

## Regions

The module renders each child with `DruxtEntity` and puts it in the slot named
after its region, so a wrapper places the regions and renders nothing itself:

```vue
<template>
  <div>
    <div class="top"><slot name="top" /></div>
    <div class="middle">
      <div class="first"><slot name="first" /></div>
      <div class="second"><slot name="second" /></div>
    </div>
    <div class="bottom"><slot name="bottom" /></div>
  </div>
</template>
```

The region names are Drupal's, from the layout plugin: `top`, `first`,
`second`, `bottom` for the two-column layouts core includes, and whatever a
custom layout declares.

A slot exists only for a region that has children in it. A `<slot name="top" />`
for an empty region renders nothing, which is what a layout with an empty
region should do, so there is no need to check first.

## The default region

Where no child names a `default` region, the `default` slot renders every
region, in the order the regions first appear among the children:

```vue
<template>
  <!-- Every region, with no layout of its own. -->
  <div><slot /></div>
</template>
```

That is the whole of a usable fallback component, and it is why
`DruxtLayoutParagraphDefault` is worth writing even for a site that styles each
layout: a layout added in Drupal renders its content rather than nothing.

## A template instead of a component

A page that needs one layout rendered its own way can pass a template to
`DruxtLayoutParagraph` rather than registering a component:

```vue
<DruxtLayoutParagraph :children="children" :entity="entity">
  <template #default="{ children, entity }">
    <DruxtDebug :json="{ children, entity }" />
  </template>
</DruxtLayoutParagraph>
```

## The field itself

`DruxtFieldLayoutParagraphs` is the field's own component, and it is found
from the formatter's machine name. A site that needs to change how the field
as a whole renders, rather than how one layout renders, can override it per
field:

```text
components/druxt/field/LayoutParagraphs.vue              → every such field
components/druxt/field/LayoutParagraphsFieldParagraphs.vue → field_paragraphs only
```

The more specific name wins. Overriding the field means taking on the request
for the paragraphs as well, which the module's own component makes.
