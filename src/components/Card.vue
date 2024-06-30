<script lang="ts" setup>
import { defineComponent, onMounted, ref} from 'vue'
import router from "../router";
import {likeActivityInfo, recordUser} from "../api/user";
import {mdiShare, mdiBookshelf, mdiHeart} from "@mdi/js";


const props = defineProps({
  content: Object
})
const userMessage:any = ref([])
const username = ref()
const updateContent:any = ref([])
onMounted(() => {
  const storedUserMessage = localStorage.getItem('userLoginInfo');
  if (storedUserMessage) {
    userMessage.value = JSON.parse(storedUserMessage);
    username.value = userMessage.value.username
  }
})
const goToContent = async () => {
  router.push({
    path: '/useContent',
    query: {
      id: props.content.id,
      title: props.content.title,
      scontent: props.content.scontent,
      contentimg: props.content.contentimg,
      updatetime: props.content.updatetime,
      status: props.content.status,
      username: props.content.username,
      like: props.content.like
    }
  })
  try {
    let result = await recordUser({username: username.value,title:props.content.title, id: props.content.id})
    updateContent.value = result.data
  }catch (error) {
    console.error("发送失败:", error);
  }
}
const likeStatus = ref(false);
const youLike = async () => {
  // try {
  //  let result:any = await likeActivityInfo({
  //     username: username.value,
  //     liketitle: props.content.title,
  //     id: props.content.id
  //   })
  //     likeStatus.value = !likeStatus.value;
  // }catch (error) {
  //   console.log('发送失败', error)
  // }
  // console.log(likeStatus.value)
  console.log('')
}
defineComponent({
  name: "Card"
})
</script>

<template>
  <div class="card">
    <v-card
      class="mx-auto"
      max-width="100%"
      color="#dbebef"
      hover
    >
      <v-img
        class="align-end text-white"
        height="200"
        :src="props.content.contentimg"
        cover
        @click="goToContent()"
      >
        <v-card-title>{{ props.content.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pt-4">
        {{ props.content.updatetime }}
      </v-card-subtitle>

      <v-card-text>
        {{props.content.scontent}}
      </v-card-text>

      <v-card-actions>
        <v-card-actions>
          <div class="like" style="padding-right: 20px">
            <v-btn
              :icon="mdiHeart"
              size="small"
              @click="youLike"
              :color="likeStatus === true ? 'red-darken-2' : 'medium-emphasis'"
            ></v-btn>
          </div>

          <div class="look" style="padding-right: 20px">
            <v-icon
              color="medium-emphasis"
              :icon="mdiBookshelf"
              size="small"
            ></v-icon>
            <span>{{props.content.look}}</span>
          </div>

          <div class="share">
            <v-btn
              color="medium-emphasis"
              :icon="mdiShare"
              size="small"
            ></v-btn>
          </div>

        </v-card-actions>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped lang="sass">

</style>
