<template>
  <v-app id="inspire">
    <header-bar></header-bar>

    <v-main class="bg-grey-lighten-3">

      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="2"
          >
            <v-sheet
              min-height="0"
              rounded="lg"
            >
              <Search></Search>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            md="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <show-content></show-content>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            md="2"
          >
            <v-sheet
              min-height="268"
              rounded="lg"
              style="text-align: center"
            >
              <v-card-text>
                <v-avatar size="x-large" :color="!userInfo ? 'grey' : 'red'">
<!--                  <v-img-->
<!--                    alt="avatar"-->
<!--                    :src="userInfo.avatar"-->
<!--                  ></v-img>-->
                  <span class="text-h5">{{ userInfo?.username || '登录' }}</span>
                </v-avatar>
                <h2 style="color:#424849;">{{userInfo?.username || '请登录'}}</h2>
              </v-card-text>
              <div class="todayLook" style="text-align: center; padding-bottom: 40px">
                <h2>今日浏览</h2>
                <h1 class="font-weight-bold text-h2 text-basil">
                  {{todayLook}}
                </h1>
              </div>
              <div class="btn-get-message">
                <v-btn
                  class="btn-message text-none"
                  :prepend-icon="mdiMessage"
                  variant="text"
                  color="success"
                  border
                  @click="getMessage"
                >
                  收件箱
                </v-btn>
              </div>
              <div class="messageInBox">
                <MessageInbox :showDialog="showMessageInbox" :messageInfo="getMessageInfo" @update:showDialog="showMessageInbox = $event"></MessageInbox>
              </div>
            </v-sheet>
          </v-col>
          <div class="top" style="position: fixed ;  right: 13%; top: 85%">
            <v-col cols="auto" >
              <v-btn :icon="mdiArrowUp" size="x-large" @click="gotoTop"></v-btn>
            </v-col>
          </div>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderBar from "./headerBar.vue";
import ShowContent from "./showContent.vue";
import Search from "../components/Search.vue";
import {onMounted, ref} from "vue";
import {getMessageByUser, getTodayLook} from "../api/contentList";
import {mdiArrowUp, mdiMessage} from "@mdi/js";


const todayLook = ref()
const getToday = async () => {
  const result = await getTodayLook()
  todayLook.value = result.data.totalVisits
}
const userInfo = ref({})
onMounted(() => {
  const stroedUserMessage = localStorage.getItem('userLoginInfo');
  if (stroedUserMessage) {
    userInfo.value = JSON.parse(stroedUserMessage);
  }
  getToday()
})
const gotoTop = () => {
  document.documentElement.scrollTop = 0;
}
//查看收件
const showMessageInbox = ref(false);
const getMessageInfo = ref({})

const getMessage =  async () => {
  showMessageInbox.value = !showMessageInbox.value
  try {
    const result = await getMessageByUser(userInfo.value.username)
    getMessageInfo.value = result.data
  }catch (error) {
    console.log(error)
  }
}


</script>
<style lang="less">
.btn-get-message {
  padding-bottom: 20px;
}
</style>
