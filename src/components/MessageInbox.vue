<script setup lang="ts">
import {defineComponent, ref} from 'vue'
import {writeMessage} from "../api/contentList";

defineComponent({
  name: "MessageInbox"
})
const props = defineProps({
  showDialog: Boolean,
  messageInfo: Object
})
const emit = defineEmits(['update:showDialog']);
const cheelMessage = () => {
  emit('update:showDialog', false);
}
const isDetailView = ref(false); // 控制视图状态的变量
const selectedMessage = ref({});
const getdetailed = (item) => {
  selectedMessage.value = item;
  isDetailView.value = true;
}
const backToMessages = () => {
  isDetailView.value = false; // 切换回表格视图
};

</script>

<template>
  <div class="dialog">
    <v-dialog v-model="props.showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">收件箱</span>
        </v-card-title>
        <v-table
          height="300px"
          fixed-header
          v-if="!isDetailView"
        >
          <thead>
          <tr>
            <th class="text-left">
              #
            </th>
            <th class="text-left">
              内容
            </th>
            <th class="text-left">
              留言者
            </th>
            <th class="text-left">
              发送时间
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(item,index) in props.messageInfo"
            :key="item.id"
            @click="getdetailed(item)"
            class="onclick"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ item.mailcontent }}</td>
            <td>{{ item.senduser }}</td>
            <td>{{ item.senddate.slice(0, 10) }}</td>
          </tr>
          </tbody>
        </v-table>
        <!-- 详细内容视图 -->
        <div class="details" v-else>
          <v-card-text class="pa-0 text-medium-emphasis">
            <!-- 这里可以添加一个滚动容器来展示详细内容 -->
            <v-scroll-y-transition>
              <div class="details-text" v-if="selectedMessage">
                <!-- 展示选中行的详细信息 -->
                <div>内容: {{ selectedMessage.mailcontent }}</div>
                <div>留言者: {{ selectedMessage.senduser }}</div>
                <div>发送时间: {{ selectedMessage.senddate.slice(0,10) }}</div>
                <!-- 根据需要展示更多信息 -->
              </div>
            </v-scroll-y-transition>
          </v-card-text>
          <!-- 返回按钮 -->
          <v-btn class="btn-details" color="blue darken-1" @click="backToMessages">
            返回
          </v-btn>
        </div>
        <v-card-actions>
<!--          <v-spacer></v-spacer>-->
          <v-btn color="blue darken-1" @click="cheelMessage">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped lang="less">
.onclick:hover {
  background-color: #f5f5f5;
}
.details {
  margin: 20px;
  position: relative;
  .details-text {
    padding-bottom: 30px;
  }
  .btn-details {
    position: fixed;

  }
}
</style>
