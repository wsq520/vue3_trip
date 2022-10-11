import { getCityAll } from "@/services/modules/city";
import { defineStore } from "pinia";

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},
    currentCity: { cityName: "广州" }
  }),
  actions: {
    async fetchAllCities() {
      const res = await getCityAll()
      this.allCities = res.data.data
    }
  }
})

export default useCityStore