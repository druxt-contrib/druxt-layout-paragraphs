# DruxtLayoutParagraphs

[![npm](https://badgen.net/npm/v/druxt-layout-paragraphs)](https://www.npmjs.com/package/druxt-layout-paragraphs)
[![CI](https://github.com/druxt-contrib/druxt-layout-paragraphs/actions/workflows/ci.yml/badge.svg)](https://github.com/druxt-contrib/druxt-layout-paragraphs/actions/workflows/ci.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/druxt-contrib/druxt-layout-paragraphs/badge.svg?targetFile=package.json)](https://snyk.io/test/github/druxt-contrib/druxt-layout-paragraphs?targetFile=package.json)
[![codecov](https://codecov.io/gh/druxt-contrib/druxt-layout-paragraphs/branch/main/graph/badge.svg?token=TwCLJOKEjm)](https://codecov.io/gh/druxt-contrib/druxt-layout-paragraphs)

> Druxt support for the Drupal Layout Paragraphs module

## Links

- DruxtJS: https://druxtjs.org
- Community Discord server: https://discord.druxtjs.org
- Layout Paragraphs project page: https://www.drupal.org/project/layout_paragraphs

## Features

- **Layout Paragraphs** field wrapper.
- **DruxtLayoutParagraph** component, auto referenced by field wrapper.
  - Wrapper component support:
    - `DruxtLayoutParagraph[Layout]`
    - `DruxtLayoutParagraphDefault`
  - Slots per region, e.g. `top`, `first`, `second`, `bottom`
## Install

`$ npm install druxt-layout-paragraphs`

### Nuxt.js

Add module to `nuxt.config.js`

```js
module.exports = {
  buildModules: [
    'druxt-entity',
    'druxt-layout-paragraphs'
  ],
  druxt: {
    baseUrl: 'https://demo-api.druxtjs.org'
  }
}
```

### Drupal

1. Download, install and setup the [Layout Paragraphs module](https://www.drupal.org/project/layout_paragraphs).
2. Set the **Layout Paragraphs** field formatter on the Layout Paragraphs fields.
  ![Layout Paragraphs field formatter](./docs/images/field-formatter.png)
