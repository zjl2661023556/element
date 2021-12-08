<template>
  <div>
    <el-dialog
      :title="$t('msg.excel.title')"
      :model-value="dialogShow"
      @close="close"
      width="30%"
    >
      <el-input
        :model-value="filename"
        :placeholder="$t('msg.excel.placeholder')"
      ></el-input>
      <slot></slot>
      <template #footer>
        <el-button @click="close">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="exportExcel">
          {{ $t('msg.excel.confirm') }}</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'

import { exportJsonToExcel } from '@/utils/Export2Excel'
import { ElMessage } from 'element-plus'
const props = defineProps({
  dialogShow: {
    type: Boolean,
    require: true
  },
  data: {
    type: Array,
    require: true
  },
  header: {
    type: Array,
    require: true
  },
  filename: {
    type: String,
    require: true
  },
  message: {
    type: String,
    default: '下载成功'
  }
})

const emit = defineEmits(['closeDialog'])
const close = () => {
  emit('closeDialog')
}

// 导出业务执行
const exportExcel = () => {
  // 1.文件名不选的话应该有默认值 filename 用英文切换
  // 2.导出全部excel 数据  || 导出当前页 -->exportData
  // 3.利用工具  将服务返回用户数据 --》转换成 excel  数据 --》

  // console.log(result)
  // 4.解析 ecxel 数据 ，并且下载该文件
  exportJsonToExcel({
    header: props.header, // Object.keys(USER_RELATION),
    data: props.data,
    filename: props.filename,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then((res) => {
    // 6.提示信息
    ElMessage.success(props.message)
  })
  // 5. 关闭dialog
  close()
}
</script>
<style lang="scss" scoped></style>
