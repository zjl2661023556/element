<template>
  <el-dialog
    :model-value="showDialogVariable"
    :title="$t('msg.theme.themeChange')"
    width="30%"
    @close="handleClose"
  >
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="color" :predefine="predefineColor1" />
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{
          $t('msg.universal.cancel')
        }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { predefineColors } from '@/common/common'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme'
const store = useStore()

defineProps({
  showDialogVariable: {
    type: Boolean,
    require: true
  }
})

const emits = defineEmits(['closeDialog'])
// 关闭模态框
const handleClose = () => {
  // 触发一个自定义的事件 closeDialog
  emits('closeDialog')
}

// 取色器选中的颜色 主题色 刷新不能掉 其他地方需要使用主体色 vuex
const color = ref(store.getters.theme_color)

// 定义预定颜色
const predefineColor1 = [...predefineColors]

// 确认切换按钮
const confirm = async () => {
  //  console.log(color.value)
  // 1.保存主题色
  store.commit('theme/setMyColor', color.value)

  // 2.替换element 和本地的样式 来让主体色生效

  /*
    1.获取所有的element的样式  不同版本的样式不一样的
    2.将样式中的情景颜色替换成color.value
       color 基本色 --》 生成一些列的和她相近的情景色
    3.将替换完的样式 插入到header中，利用css 的优先级让插入的样式生效
  */
  // 2-1 生成最终要替换的颜色
  const newStyle = await generateNewStyle(color.value)
  // console.log(newStyle)

  // 2-2 将替换玩的样式插入到header中 利用css 的优先级让插入的样式生效
  writeStyleToHearTag(newStyle)

  // 3.关闭dialog
  emits('closeDialog')
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
