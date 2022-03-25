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

<script>
import { DruxtLayoutParagraphMixin } from 'druxt-layout-paragraphs'
export default {
  mixins: [DruxtLayoutParagraphMixin]
}
</script>

<style scoped>
.top {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.middle {
  display: flex;
}
</style>
