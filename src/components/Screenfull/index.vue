<template>
  <div>
    <svg-icon
      :iconName="isScreenFull ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggleScreenFull"
      className="screenIcon"
    ></svg-icon>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(false)

const toggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfill 插件完成全屏切换
  screenfull.toggle()
}
</script>
<style lang="scss" scoped>
.screenIcon {
  fill: currentColor;
  color: rgb(54, 54, 54);
}
</style>
