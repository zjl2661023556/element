<template>
  <div class="box">
    <el-form class="box1" :model="loginForm" :rules="loginRules" ref="loginRef">
      <div class="title-container">
        <h1 class="title">{{ $t('msg.login.title') }}</h1>
        <select-lang class="select-lang" />
      </div>
      <el-form-item prop="username">
        <span class="tubiao">
          <svg-icon iconName="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="tubiao">
          <svg-icon iconName="lock"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          v-model="loginForm.password"
          name="password"
          :type="flag ? 'password' : 'text'"
        ></el-input>
        <span class="tubiao" @click="qiehuan">
          <svg-icon :iconName="flag ? 'view_off' : 'view'"></svg-icon>
        </span>
      </el-form-item>
      <el-button type="primary" @click="handleLogin">{{
        $t('msg.login.loginBtn')
      }}</el-button>
      <!-- 账号tips -->
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>
<script setup>
// 眼睛切换密码的显示
import { ref, watch } from 'vue'
// 表单验证的引用
import { passwordValidate, usernameValidate } from './rule.js'
// 引入vuex
import { useStore } from 'vuex'
// 导入路由
import { useRouter } from 'vue-router'
import SelectLang from '@/components/SelectLang/index'

// 定义表单初始值
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})
const flag = ref(true)
const qiehuan = () => {
  flag.value = !flag.value
}

// 表单验证
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      // message: i18n.t('msg.login.usernameRule')   // 不具有响应式
      validator: usernameValidate()
    }
  ],
  password: [
    {
      trigger: 'blur',
      validator: passwordValidate()
    }
  ]
})

// 登录逻辑
// 怎么引用dom
const loginRef = ref(null)
// 定义store对象
const store = useStore()
// 定义路由
const router = useRouter()
const handleLogin = () => {
  // 验证一次表单的数据是否合法
  loginRef.value.validate((validate) => {
    if (!validate) {
      return // 一个规则没有通过
    }
    // 验证通过执行的登录逻辑 定义好调用aciton 保存token
    store.dispatch('user/login', loginForm.value).then((res) => {
      // 只有在登录成功的情况下 执行跳转
      router.push({
        name: 'Index'
      })
    })
  })
}

// 监听getters.language 的变话
watch(
  () => store.getters.language,
  () => {
    loginRef.value.validateField('username')
    loginRef.value.validateField('password')
  }
)
</script>

<style lang="scss" scoped>
$bg: #282c34;
//最外面盒子的设置
.box {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background: $bg;
  overflow: hidden;

  //第二层盒子的设置
  .box1 {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0px;
    margin: 0 auto;
    overflow: hiddern;

    //标题的设置
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: white;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      :deep(.select-lang) {
        position: absolute;
        top: 4px;
        right: 0px;
        background: aliceblue;
        font-size: 20px;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    // input 框的设置
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      .el-input {
        height: 47px;
        width: 85%;
        .el-input__inner {
          background: transparent;
          border: 0px;
          padding: 12px 5px 12px 10px;
          color: #ffffff;
          height: 47px;
        }
      }
    }

    //图标的样式
    .tubiao {
      padding: 6px 5px 5px 10px;
      color: blanchedalmond;
      vertical-align: middle;
      display: inline-block;
    }

    //两个按钮的大小

    .el-button--primary {
      width: 100%;
    }
    .tips {
      font-size: 16 px;
      line-height: 28px;
      color: #fff;
      margin-top: 10px;
    }
  }
}
</style>
