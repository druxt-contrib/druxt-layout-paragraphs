---
"druxt-layout-paragraphs": minor
---

Added scoped slots for layout regions.

Example:
```jsx
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
