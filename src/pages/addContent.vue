<script lang="ts" setup>
import {defineComponent, onMounted, ref, computed} from 'vue'
import {addContentInfo} from "../api/contentList";

const roles = ref()
const contentInfo = ref({
  title: '',
  username: '',
  scontent: '',
  contentimg: '',
  classify: null
})
const userMessage = ref({})

const addContent = async () => {
  try {
    const result = await addContentInfo(contentInfo.value)
    if (result && result.status === 200) {
      alert('上传成功')
      contentReset()
    }else {
      alert('上传失败')
    }
  }catch (error) {
    console.error("ERROR during add", error)
  }
}
const contentReset = () => {
  contentInfo.value.title = '';
  contentInfo.value.scontent = '';
  contentInfo.value.contentimg = '';
  contentInfo.value.classify = null
}

onMounted(() => {
  const storedUserMessage = localStorage.getItem('userLoginInfo');
  if (storedUserMessage) {
    userMessage.value = JSON.parse(storedUserMessage);
    contentInfo.value.username = userMessage.value.username
    roles.value = userMessage.value.roles
  }
})
const classify  = ref([
  {id: 1, classifyname: '标签1'},
  {id: 2, classifyname: '标签2'},
  {id: 3, classifyname: '标签3'},
  {id: 4, classifyname: '标签4'},
])
const classifyNames = computed(() => classify.value.map(item => item.classifyname));
const classifyId = computed(() => classify.value.map(item => item.id))
//文本编辑器
// 编辑器实例，必须用 shallowRef，重要！

defineComponent({
  name: "contentList"
})
</script>

<template>
  <div class="main">
    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="标题"
              variant="solo"
              v-model="contentInfo.title"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="用户名"
              v-model="contentInfo.username"
              variant="solo"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-textarea
              label="具体内容"
              v-model="contentInfo.scontent"
              clearable
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-text-field
              label="图片地址"
              variant="solo"
              v-model="contentInfo.contentimg"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="12"
          >
            <v-select
              v-model="contentInfo.classify"
              :items="classify"
              item-title="classifyname"
              item-value="id"
              label="选择分类"
            ></v-select>
          </v-col>
          <div class="btn-action" style="padding-left: 40px"  >
            <v-btn
              class="me-4"
              @click="addContent"
            >
              提交
            </v-btn>

            <v-btn @click="contentReset">
              清除
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<style scoped >

</style>
