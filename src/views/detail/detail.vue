<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      class="tabs"
      v-if="showTabControl"
      :titles="titles"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />
      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-landord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="地图"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">你的旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getDetailInfos } from '@/services/modules/detail'
import useScroll from '@/hooks/useScroll'

import TabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail-swipe.vue'
import DetailInfos from './cpns/detail-infos.vue'
import DetailFacility from './cpns/detail-facility.vue'
import DetailLandord from './cpns/detail-landlord.vue'
import DetailComment from './cpns/detail-comment.vue'
import DetailNotice from './cpns/detail-notice.vue'
import DetailMap from './cpns/detail-map.vue'
import DetailIntro from './cpns/detail-intro.vue'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  // console.log(res)
  detailInfos.value = res.data.data
})

const onClickLeft = () => {
  router.back()
}

const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  // console.log(scrollTop.value)
  return scrollTop.value >= 260
})

// const sectionEls = []
// const getSectionRef = (value) => {
// $el 拿到组件的根元素
//   sectionEls.push(value.$el)
// }
// console.log(sectionEls)

// const tabClick = (index) => {
//   let instance = sectionEls[index].offsetTop
//   if (index !== 0) {
//     instance = instance - 44
//   }
//   detailRef.value.scrollTo({
//     top: instance,
//     behavior: "smooth"
//   })

const sectionEls = ref({})
const titles = computed(() => {
  return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }
  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}

const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }

  if (isClick) return
  //  获取每个区域对应的offsetTop
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)

  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  if (tabControlRef.value) {
    tabControlRef.value.currentIndex = index
  }
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>