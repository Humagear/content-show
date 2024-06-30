<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import {mdiAccount, mdiServerMinus} from "@mdi/js";
import {getUserContent} from "../api/contentList";
import router from "../router";

defineComponent({
  name: "userContentList"
})

const userName = ref()
const userMessage = ref({})
const contentUserList = ref({})
const getToLogin = () => {
  if (!userMessage.value) {
    router.push('/login')
  }else {
    localStorage.removeItem('userLoginInfo')
    window.location.reload();
    router.push('/userContentList')
  }

}
onMounted(async () => {
  const storedUserMessage = localStorage.getItem('userLoginInfo');
  userMessage.value = JSON.parse(storedUserMessage);
  userName.value = userMessage.value.username;
  try {
    const result = await getUserContent(userName.value)
    contentUserList.value = result.data
    console.log(contentUserList.value)
  }catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div class="main">
    <div class="userInfo" style="margin: 10px">
      <v-card
        class="mx-auto"
        title="个人信息"
        max-width="100%"
      >
        <template v-slot:prepend>
          <v-icon color="primary" :icon="mdiAccount"></v-icon>
        </template>
        <v-card-text v-if="userMessage">
          <div class="userInfo mx-auto" style="display: flex; justify-content: left">
            <p class="text-h5 font-weight-black" style="padding-right: 40px; padding-top: 5px">{{ userMessage.username }}</p>
            <v-chip
              class="ma-1"
              color="primary"
              variant="outlined"
            >
              <v-icon :icon="mdiServerMinus" start></v-icon>
              {{ userMessage.roles }}
            </v-chip>
          </div>
          <p>注册时间 {{ userMessage.endate }}</p>
        </v-card-text>
        <v-btn class="loginBtn" variant="tonal"  @click="getToLogin">
          {{ !userMessage ? '登录' : '注销' }}
        </v-btn>
      </v-card>
    </div>
    <div class="userContent">
      <v-table>
        <tbody>
        <tr
          v-for="content in contentUserList"
          :key="content.id"
        >
          <card :content style="padding-bottom: 10px; margin: 10px" ></card>
        </tr>
        </tbody>
      </v-table>
    </div>
    <div class="userData"></div>
  </div>
</template>

<style lang="less">
.loginBtn {
  margin: 10px;
}
</style>
