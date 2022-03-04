# DruxtLayoutParagraphs

<!--
[![npm](https://badgen.net/npm/v/druxt-module)](https://www.npmjs.com/package/druxt-module)
[![Known Vulnerabilities](https://snyk.io/test/github/druxt/druxt-auth/badge.svg?targetFile=package.json)](https://snyk.io/test/github/druxt/druxt-auth?targetFile=package.json)
-->
[![CI](https://github.com/Decipher/druxt-layout-paragraphs/actions/workflows/ci.yml/badge.svg)](https://github.com/Decipher/druxt-layout-paragraphs/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/Decipher/druxt-layout-paragraphs/branch/main/graph/badge.svg?token=TwCLJOKEjm)](https://codecov.io/gh/Decipher/druxt-layout-paragraphs)

> Druxt support for the Drupal Layout Paragraphs module

## Links

- DruxtJS: https://druxtjs.org
- Community Discord server: https://discord.druxtjs.org
- Layout Paragraphs project page: https://www.drupal.org/project/layout_paragraphs

## Install

<!-- `$ npm install druxt-module` -->

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
