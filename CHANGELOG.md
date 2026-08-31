# druxt-layout-paragraphs

## 0.4.1 - 2023-09-11

### Patch Changes

- Prevented error if backend data unavailable. ([#51](https://github.com/druxt-contrib/druxt-layout-paragraphs/issues/51))

## 0.4.0 - 2023-07-17

### Minor Changes

- Added support for Custom Layouts module. ([#47](https://github.com/druxt-contrib/druxt-layout-paragraphs/issues/47), [`ef9916b`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/ef9916b))

## 0.3.0 - 2022-06-16

### Minor Changes

- Added support for root level paragraphs. ([#35](https://github.com/druxt-contrib/druxt-layout-paragraphs/issues/35), [`afadaae`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/afadaae))

## 0.2.2 - 2022-05-25

### Patch Changes

- Fixed issue with custom Axios instance and API proxy. ([`6b51a22`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/6b51a22))

## 0.2.1 - 2022-03-28

### Patch Changes

- Fixed incorrectly hardcoded layout paragraph resource type. ([`0fa3a3e`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/0fa3a3e))

## 0.2.0 - 2022-03-25

### Minor Changes

- Added scoped slots for layout regions. ([`0aa3b3c`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/0aa3b3c))

  Example:

  ```jsx
  <template>
    <div>
      <div class="top">
        <slot name="top" />
      </div>
      <div class="middle">
        <div class="first">
          <slot name="first" />
        </div>
        <div class="second">
          <slot name="second" />
        </div>
      </div>
      <div class="bottom">
        <slot name="bottom" />
      </div>
    </div>
  </template>
  ```

- Added DruxtLayoutParagraphMixin. ([`fd2ed0e`](https://github.com/druxt-contrib/druxt-layout-paragraphs/commit/fd2ed0e))

  Example:

  ```html
  <script>
    import { DruxtLayoutParagraphMixin } from "druxt-layout-paragraphs";
    export default {
      mixins: [DruxtLayoutParagraphMixin],
    };
  </script>
  ```

## 0.1.0 - 2022-03-04

### Minor Changes

- Initial release.
