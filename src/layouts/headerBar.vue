<script lang="ts" setup>
import {defineComponent, onMounted, ref} from 'vue'
import router from "../router";
const links = [
  {text: "首页" , path: '/'},
  // {text: "关于" , path: '/about'},
  {text: "添加内容", path: '/addContent'},
  {text: "我的", path: "/userContentList"}
]
const goToOther = (path:any) => {
  router.push(path)
}
const userInfo:any = ref([])
onMounted(() => {
  userInfo.value = JSON.parse(localStorage.getItem('userLoginInfo'))
})
defineComponent({
  name: "headerBar"
})
</script>

<template>
  <div class="header-bar">
      <v-app-bar
        class="px-3"
        density="compact"
        flat
      >
        <v-spacer></v-spacer>

        <v-tabs
          color="grey-darken-2"
          centered
        >
          <v-tab
            v-for="link in links"
            :key="link"
            :text="link.text"
            @click="goToOther(link.path)"
          ></v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
      </v-app-bar>
  </div>
</template>

<style scoped lang="sass">

</style>
