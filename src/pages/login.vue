<script lang="ts" setup>
import {defineComponent, reactive, ref, onMounted} from 'vue'
import {getLogin} from "../api/user";
import router from "../router";
import { mdiAccount, mdiLock } from '@mdi/js'

const userForm = reactive(
  {
    username: "",
    password: ""
  }
)
const userMessage:any = ref([])
const onLogin = async () => {
  try {
    let result = await getLogin({ username: userForm.username, password: userForm.password });
    userMessage.value = result.data;

    // 存储登录信息到 localStorage
    localStorage.setItem('userLoginInfo', JSON.stringify(userMessage.value.data));
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 0);
    // 可以在这里执行路由跳转等操作
  } catch (error) {
    console.error("登录失败:", error);
  }
};
//设置一个 setTimeout 函数来延迟清除这些数据
// const storeDataWithTimeout = (key, data, timeout) => {
//   localStorage.setItem(key, JSON.stringify(data));
//   setTimeout(() => {
//     localStorage.removeItem(key);
//   }, timeout);
// };
// storeDataWithTimeout('userLoginInfo', userMessage, 3600000);
const onEnroll = () => {
  router.push('/enroll')
}
onMounted(() => {
  const storedUserMessage = localStorage.getItem('userLoginInfo');
  if (storedUserMessage) {
    userMessage.value = JSON.parse(storedUserMessage);
  }
});
defineComponent({
  name: "login"
})
</script>

<template>
  <div class="login">
    <v-sheet class="mx-auto" width="300" style="padding-top: 20px">
      <h1 class="font-weight-bold text-h2 text-basil" style="text-align: center; padding-bottom: 40px">
        登录
      </h1>
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="userForm.username"
          label="username"
          :prepend-icon="mdiAccount"
        ></v-text-field>

        <v-text-field
          v-model="userForm.password"
          label="passward"
          :prepend-icon="mdiLock"
        ></v-text-field>
        <span>测试账号：test123456 密码：test123456</span>
        <v-btn class="mt-2" type="submit" block @click="onLogin">登录</v-btn>
        <v-btn class="mt-2" type="submit" block @click="onEnroll">注册</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped lang="sass">

</style>
