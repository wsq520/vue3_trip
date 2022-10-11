<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(item, index) in groupData.hotCities">
          <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>

      <template v-for="(item, index) in groupData?.cities" :key="item">
        <van-index-anchor :index="item.group" />
        <template v-for="(iten, indey) in item.cities" :key="iten">
          <van-cell :title="iten.cityName" @click="cityClick(iten)"/>
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {useRouter} from 'vue-router'

import useCityStore from '@/stores/modules/city'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift('#')
  return list
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  cityStore.currentCity = city
  // console.log(city)
  router.back()
}

</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
    width: 70px;
    height: 28px;
    line-height: 28px;
    border-radius: 12px;
    font-size: 12px;
    color: #000;
    text-align: center;
    background-color: #fff4ec;
    margin: 6px 0;
  }
}
</style>