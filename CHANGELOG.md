# druxt-layout-paragraphs

## 0.2.1

### Patch Changes

- 0fa3a3e: Fix incorrectly hardcoded layout paragraph resource type.

## 0.2.0

### Minor Changes

- 0aa3b3c: Added scoped slots for layout regions.

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

- fd2ed0e: Added DruxtLayoutParagraphMixin.

  Example:

  ```html
  <script>
    import { DruxtLayoutParagraphMixin } from "druxt-layout-paragraphs";
    export default {
      mixins: [DruxtLayoutParagraphMixin]
    };
  </script>
  ```

## 0.1.0

### Minor Changes

- Initial release.
