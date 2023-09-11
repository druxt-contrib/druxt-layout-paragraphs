# druxt-layout-paragraphs

## 0.4.1

### Patch Changes

- fix(#51): prevent error if backend data unavailable

## 0.4.0

### Minor Changes

- ef9916b: feat(#47): added support for Custom Layouts module

## 0.3.0

### Minor Changes

- afadaae: feat(#35): Added support for root level paragraphs.

## 0.2.2

### Patch Changes

- 6b51a22: Fixed issue with custom Axios instance and API proxy.

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
      mixins: [DruxtLayoutParagraphMixin],
    };
  </script>
  ```

## 0.1.0

### Minor Changes

- Initial release.
