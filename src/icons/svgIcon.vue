//封装的icon图标使用
<template>
  <svg aria-hidden="true" class="defaultSvgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
</script>

<style lang="scss" scoped>
.defaultSvgClass {
  width: 1.5em;
  height: 1.5em;
  fill: #181818;
  vertical-align: -0.2em;
  overflow: hidden;
}
</style>
