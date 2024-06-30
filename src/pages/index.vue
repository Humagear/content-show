<script lang="ts" setup>
import {defineComponent, onMounted, ref} from 'vue'
import {uesStoreList} from "../stores/content";
import {mdiAccount} from "@mdi/js";
import {getClassifyContentList, getClassifyInfo} from "../api/contentList";

let contentList:any = ref([])
const getContent = uesStoreList();
defineComponent({
  name: "index"
})
const loadData = async () => {
  await getContent.getContentList();
  contentList.value = getContent.contentList.data;
}
const classify :any = ref([
  // {id: 1, classifyname: '标签1'},
  // {id: 2, classifyname: '标签2'},
  // {id: 3, classifyname: '标签3'},
  // {id: 4, classifyname: '标签4'},
])
const getClassifyContent = async (id) => {
  const result = await getClassifyContentList(id);
  contentList.value = result.data
}
const getClassify = async () => {
  const result = await getClassifyInfo()
  classify.value = result.data
}
onMounted(async () => {
  await loadData();
  await getClassify();
})
</script>

<template>
  <div class="main" style="padding: 10px">
    <div class="classify">
      <v-chip
        class="ma-2"
        color="primary"
        variant="outlined"
        @click="loadData"
      >
        全部
      </v-chip>
      <v-chip
        class="ma-2"
        color="primary"
        variant="outlined"
        v-for="(item, index) in classify" :key="index"
        @click="getClassifyContent(item.id)"
      >
        {{ item.classifyname }}
      </v-chip>
    </div>
    <v-table>
      <tbody>
      <tr
        v-for="content in contentList"
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
