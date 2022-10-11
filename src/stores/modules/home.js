import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeHouseData } from '@/services/modules/home'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    houselist: [],
    currentPage: 1
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data.data
    },
    async fetchHouselistData() {
      const res = await getHomeHouseData(this.currentPage)
      this.houselist.push(...res.data.data)
      this.currentPage++
    }
  }
})

export default useHomeStore