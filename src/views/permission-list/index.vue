<template>
  <el-card>
    {{ isShowChildren }}
    <el-button type="primary" @click="toggle"> 全部展开 </el-button>
  </el-card>
  <el-card>
    <el-table
      ref="table"
      :data="permissionData"
      style="width: 100%; margin-bottom: 20px"
      border
      row-key="id"
      :default-expand-all="isShowChildren"
      :tree-props="{ children: 'children' }"
      :header-cell-style="{
        background: store.getters.cssVar['light-1'],
        color: '#eee',
        fontWeight: 900
      }"
    >
      <el-table-column
        prop="permissionName"
        :label="$t('msg.permission.name')"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="permissionMark"
        :label="$t('msg.permission.mark')"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="permissionDesc"
        :label="$t('msg.permission.desc')"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getAllPermissions } from '@/api/permission.js'
import { useStore } from 'vuex'
const store = useStore()
const permissionData = ref([])

// 权限分类
/*
[
  { -->  页面权限（一级） 1.能在左边的菜单看到这个选项 2. 可以点击进入当前组件
    children :[
      {}--》 该页面中的操作权限（二级） --》可以看到页面中的操作按钮，并点击执行相应业务
    ]
  }
]
*/
const initPermission = async () => {
  const data = await getAllPermissions()
  permissionData.value = data
  console.log(data)
}
initPermission()

// 修改二级菜单的背景
const childrenBgColor = ref(store.getters.cssVar['light-9'])

// 修改hover下的背景
const hoverBgColor = ref(store.getters.cssVar['light-7'])

// 全部展开和收起二级菜单
const isShowChildren = ref(false)
const table = ref(null)
const toggle = () => {
  isShowChildren.value = !isShowChildren.value
  table.value.doLayout()
}

// 监听主体切换
watch(
  () => {
    return store.getters.cssVar
  },
  () => {
    childrenBgColor.value = store.getters.cssVar['light-9']
    hoverBgColor.value = store.getters.cssVar['light-7']
  }
)
</script>
<style lang="scss" scoped>
:deep(.el-table__row--level-1 > td) {
  background-color: v-bind(childrenBgColor);
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(hoverBgColor) !important;
}
</style>
