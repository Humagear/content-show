<script lang="ts" setup>
import {computed, defineComponent, onMounted, ref} from 'vue'
import {mdiCheck, mdiAlert, mdiInformationVariant, mdiMessage} from "@mdi/js";
import {useRoute} from "vue-router";
import {writeMessage} from "../api/contentList";
import router from "../router";
const userMessage = ref({})
const route = useRoute();
const useContent = route.query
const userName = ref()
const statusContent = ref()
const messageInfo:any = ref({
  senduser: '',
  getuser: '',
  mailcontent: ''
})
defineComponent({
  name: "useContent"
})

const getIconStatus2 = (status)  => {
  switch (status) {
    case '通过' :
      return mdiCheck;
    case '未通过':
      return mdiCheck;
    default:
      return mdiInformationVariant
  }
}
const getIconStatus3 = (status) => {
  switch (status) {
    case '通过':
      return mdiCheck;
    case '未通过':
      return mdiAlert;
    default:
      return mdiInformationVariant
  }
}

//给作者留言
const showDialog = ref(false);
const messageContent = ref('')
const setMessage = () => {
  showDialog.value = true
}
const cheelMessage = () => {
  showDialog.value = false
  messageContent.value = ''
}
const submitMessage = async () => {
  messageInfo.value.mailcontent = messageContent.value
  try {
    const result = await writeMessage(messageInfo.value);
    if (result) {
      cheelMessage()
    }
  }catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  const storedUserMessage = localStorage.getItem('userLoginInfo');
  userMessage.value = JSON.parse(storedUserMessage);
  userName.value = userMessage.value.username;
  statusContent.value = useContent.status
  //获取发送留言的信息
  messageInfo.value.senduser = userName.value;
  messageInfo.value.getuser = useContent.username;
})
</script>

<template>
  <div class="main" style="height: 100vh">
    <div class="title" style="text-align: center; padding: 30px">
      <h1>{{useContent.title}}</h1>
      <h4>点赞数： {{ useContent.like }}</h4>
    </div>
    <div class="card-content" >
      <v-card
        class="mx-auto"
        max-width="100%"
        variants:="text"
      >
        <v-img
          class="bg-grey-lighten-2"
          max-height="300"
          :src="useContent.contentimg"
          cover
        >
          <!--        <v-card-title>Top 10 Australian beaches</v-card-title>-->
        </v-img>

        <v-card-subtitle class="pt-4">
          {{ useContent.updatetime }}
        </v-card-subtitle>

        <v-card-text>
          {{ useContent.scontent }}
        </v-card-text>

        <v-card-actions>
          <!--        <v-btn color="orange" text="Share"></v-btn>-->

          <!--        <v-btn color="orange" text="Explore"></v-btn>-->
        </v-card-actions>
      </v-card>
    </div>
    <div class="content-status" v-if="userName === useContent.username">
      <v-timeline direction="horizontal" >
        <v-timeline-item dot-color="green-lighten-1" :icon="mdiCheck" fill-dot>
          <template v-slot:opposite>
            <span style="color: #66bb6a;">已提交</span>
          </template>
        </v-timeline-item>

        <v-timeline-item :dot-color="statusContent === '通过' || statusContent === '未通过' ? 'green-lighten-1' : 'yellow-darken-2'"
          :icon="getIconStatus2(statusContent)" fill-dot>
          <span :class="statusContent === '通过' || statusContent === '未通过' ? 'text-green' : 'text-yellow'">
            {{ statusContent === '通过' || statusContent === '未通过' ? '已审核' : '正在审核' }}
          </span>
        </v-timeline-item>

        <v-timeline-item :dot-color="statusContent === '通过' ? 'green-lighten-1' : statusContent === '未通过' ? 'red-darken-1' : 'grey-lighten-1'"
          :icon = getIconStatus3(statusContent) fill-dot>
          <template v-slot:opposite>
            <span :class="statusContent === '通过' ? 'text-green' : statusContent === '未通过' ? 'text-red' : ''">
              {{ statusContent === '通过' ? '已通过' : statusContent === '未通过' ? '未通过，请重新提交' : '正在审核' }}
            </span>
          </template>
        </v-timeline-item>
      </v-timeline>
    </div>
    <div class="usemessage">
      <v-btn
        class="btn-message text-none"
        :prepend-icon="mdiMessage"
        variant="text"
        color="success"
        border
        @click="setMessage"
      >
        给作者留言
      </v-btn>
    </div>
    <div class="text-center pa-4">
      <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">留言给作者</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    label="留言内容"
                    v-model="messageContent"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="cheelMessage">
              取消
            </v-btn>
            <v-btn color="blue darken-1" @click="submitMessage">
              确认
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="comments">

    </div>
  </div>
</template>

<style lang="less">
.main {
  position: relative;
  .content-status {
    width: 90%;
    padding-left: 10%;
    padding-top: 40px;
  }
  .usemessage{
    position: absolute;
    right: 8%;
    padding-top: 30px;
  }
}

</style>
