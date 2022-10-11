<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import useCityStore from '@/stores/modules/city'

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

const searchValue = ref("")
const cancelClick = () => {
  router.back()
}

const tabActive = ref()

const cityStore = useCityStore()
cityStore.fetchAllCities()
const { allCities } = storeToRefs(cityStore)

const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
.city {
  --van-tabs-line-height: 44px;

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }

  .top {
    position: relative;
    z-index: 9;
  }
}
</style>