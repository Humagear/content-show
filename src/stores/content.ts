import {defineStore} from "pinia";
import {getContentList, getSearch} from "../api/contentList";


export const uesStoreList = defineStore("content-list",{
  state: () => ({
    contentList:{},
    todayNum: '',
    searchContent: []
  }),
  getters: {},
  actions: {
    async getContentList() {
      this.contentList = await getContentList()
    },
    // 搜索内容并更新状态
    async searchRes(title) {
      const result = await getSearch(title)
      this.searchContent = result.data
    },
    clearSearch(){
      this.searchContent = []
    }

  }
})
