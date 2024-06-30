<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import {mdiMagnify, mdiClose} from "@mdi/js";
import {uesStoreList} from "../stores/content";
import router from "../router";
defineComponent({
  name: "Search"
})
const searchTitle = ref('')
const searchContent:any = ref([])
const store = uesStoreList();

const goToSearch = async (title) => {
  try {
    // 等待 action 完成
    await store.searchRes(title);
    searchContent.value = store.searchContent; // 确保状态已更新
    router.push('/searchContent');
    searchTitle.value = ''
    console.log(searchTitle.value)
  } catch (error) {
    console.error("搜索出错:", error);
    // 处理错误，例如显示提示信息
  }
};

const clearMessage = () => {
  searchTitle.value = ''
}

</script>

<template>
  <div class="search">
    <v-text-field
      v-model="searchTitle"
      :append-inner-icon="mdiMagnify"
      density="compact"
      label="点击搜索"
      variant="solo"
      hide-details
      single-line
      :clear-icon="mdiClose"
      @click:append-inner="goToSearch(searchTitle)"
      @click:clear="clearMessage"
    ></v-text-field>
  </div>
</template>

<style scoped lang="sass">

</style>
