//封装的icon图标使用
<template>
  <svg aria-hidden="true" :class="getClassName">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script setup>
import { computed, defineProps } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  iconName: {
    type: String,
    require: true
  },
  className: {
    type: String
  }
})
const iconName = computed(() => {
  return `#icon-${props.iconName}`
})
const store = useStore()
const getClassName = computed(() => {
  if (store.getters.sideBarOpen) {
    if (props.className) {
      // 如果传了 className  -->  defacltSvgClass sideClass
      return ['defaultSvgClass', props.className]
    } else {
      return 'defaultSvgClass'
    }
  } else {
    return 'defaultSvgClass'
  }
})
</script>

<style lang="scss" scoped>
.defaultSvgClass {
  width: 1.3em;
  height: 1.3em;
  fill: currentColor;
  vertical-align: -0.2em;
  overflow: hidden;
}
</style>
