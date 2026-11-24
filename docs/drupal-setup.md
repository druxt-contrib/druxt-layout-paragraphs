# Drupal setup

What the Drupal site needs before a Druxt site can render a Layout Paragraphs
field. The repository's own `example/drupal` is built against Drupal 9.5.10,
Layout Paragraphs 1.0.0 and the Druxt module 1.2.0.

- [Modules](#modules)
- [A layout paragraph type](#a-layout-paragraph-type)
- [The field](#the-field)
- [The field formatter](#the-field-formatter)
- [Permissions](#permissions)
- [Check the site](#check-the-site)

## Modules

1. Install [Layout Paragraphs](https://www.drupal.org/project/layout_paragraphs),
   which brings [Paragraphs](https://www.drupal.org/project/paragraphs) with
   it:

   ```sh
   composer require drupal/layout_paragraphs
   drush pm:install layout_paragraphs
   ```

2. Install the [Druxt module](https://www.drupal.org/project/druxt), for
   JSON:API and the rest of what a Druxt site reads:

   ```sh
   composer require drupal/druxt
   drush pm:install druxt
   ```

## A layout paragraph type

Layout Paragraphs holds the layout on the paragraph rather than on the field.
A paragraph of a type with the behaviour enabled records which layout it is
and which region each of its children belongs to.

1. Add or edit a paragraph type at `/admin/structure/paragraphs_type`.
2. Under **Behaviors**, enable **Layout Paragraphs**.
3. Choose the layouts it may use. Each one's machine name is what decides the
   component the site renders it with, so it is worth reading the list:
   [Theming](theming.md#the-component-name) has the rule that turns
   `layout_twocol` into `DruxtLayoutParagraphTwocol`.

The other paragraph types, the ones that hold content rather than layout, need
nothing. They are rendered by Druxt Entity as themselves.

## The field

Add a **Paragraphs** reference field to the entity that holds the layout, such
as a node type, and allow the layout type and the content types in it.

## The field formatter

On the entity's view display, set the field's formatter to **Layout
Paragraphs**:

```yaml
# core.entity_view_display.node.page.default.yml
content:
  field_paragraphs:
    type: layout_paragraphs
    label: hidden
```

This is the part a site cannot work without. Druxt finds a field's component
from the formatter's machine name, so `layout_paragraphs` is what reaches
this module's `DruxtFieldLayoutParagraphs`. With any other formatter the field
renders as that formatter instead, and the layout is lost without an error.

`/admin/structure/types/manage/page/display` is where to set it.

## Permissions

The site reads the paragraphs over JSON:API as a separate request, following
the field's `related` link, so the role the site reads as needs to view them.
Paragraphs are normally viewable by anyone who can view the entity holding
them, which is the default. A site that returns an entity with an empty layout
is usually a permission on the paragraph, not on the node.

## Check the site

The field's `related` link holds the paragraphs:

```sh
curl -s 'https://cms.example.com/jsonapi/node/page/<uuid>?include=field_paragraphs' | \
  python3 -m json.tool
```

Each paragraph's `attributes.behavior_settings.layout_paragraphs` is what this
module reads:

```json
{
  "region": "first",
  "parent_uuid": "132fc071-804f-4314-a123-0c3587f2574a",
  "layout": "",
  "config": []
}
```

A paragraph with a `layout` is a layout; one with a `parent_uuid` and a
`region` is a child of that layout. A paragraph with neither is rendered on
its own, in the field's order.
