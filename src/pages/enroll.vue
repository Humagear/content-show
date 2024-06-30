<script lang="ts" setup>
import {defineComponent, ref} from 'vue'
import router from "../router";
import {addUserInfo} from "../api/user";
import { mdiAccount, mdiLock } from '@mdi/js'
const enrollInfo = ref({
  username: '',
  password: ''
})
const cancelBack = () => {
  router.push('/login')
}
const setUserInfo = async () => {
  try {
    const result = await addUserInfo(enrollInfo.value)
    if (result && result.status === 201) {
      // 增加成功的逻辑
      alert("注册成功")
      router.push('/login')
    } else {
      // 处理非200状态码的情况
     alert('注册失败')
    }
  } catch (error) {
    // 捕获并处理错误
    console.error("Error during add", error);
  }
}
const resetInfo = () => {
  enrollInfo.value.username = '';
  enrollInfo.value.password = '';
}
defineComponent({
  name: "enroll"
})
</script>

<template>
  <div class="enroll">
    <v-sheet class="mx-auto" width="300" style="padding-top: 20px">
      <h1 class="font-weight-bold text-h2 text-basil" style="text-align: center; padding-bottom: 40px">
        注册
      </h1>
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="enrollInfo.username"
          label="username"
          :prepend-icon="mdiAccount"
        ></v-text-field>

        <v-text-field
          v-model="enrollInfo.password"
          label="password"
          :prepend-icon="mdiLock"
        ></v-text-field>

        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          label="Avatar"
          placeholder="Pick an avatar"
          style=""
        ></v-file-input>

        <v-btn class="mt-2" type="submit" block @click="setUserInfo">确认</v-btn>
        <v-btn class="mt-2" type="submit" block @click="resetInfo">重置</v-btn>
        <v-btn class="mt-2" type="submit" block @click="cancelBack">取消</v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<style scoped lang="sass">

</style>
