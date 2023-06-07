<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive includes="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <TabBar v-show="!route.meta.hideTabBar" />
    <loading />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loding from '@/components/loading/loading.vue'

const route = useRoute()

</script>

<style scoped>
</style>
