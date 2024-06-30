<script setup lang="ts">
import {defineComponent, onMounted, ref, watch} from 'vue'
import {uesStoreList} from "../stores/content"
import router from "../router";
import {mdiMagnify} from "@mdi/js";

defineComponent({
  name: "searchContent"
})
const searchContent:any = ref([])
const store = uesStoreList()

onMounted(async () => {
  try {
    // 假设这里需要从 API 获取数据
    searchContent.value = await store.searchContent
  } catch (error) {
    console.error("获取搜索内容出错:", error);
    // 处理错误，例如导航回搜索页面
  }
});
watch(() => store.searchContent, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    searchContent.value = store.searchContent
    router.push('/searchContent')
  }
});
</script>

<template>
  <div class="search" style="padding: 10px">
    <div class="noSearch" v-if="searchContent.length == 0">
      <v-empty-state
        :icon="mdiMagnify"
        title="未找到你需要的内容"
      ></v-empty-state>
    </div>
    <v-table>
      <tbody>
      <tr
        v-for="content in searchContent"
        :key="content.id"
      >
        <card :content style="padding-bottom: 10px" v-if="content.status === '通过'"></card>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped lang="sass">

</style>
