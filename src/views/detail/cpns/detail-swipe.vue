<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="2000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <!-- template #indicator="props" 作用域插槽  下面使用解构语法获取props部分属性
            active属性拿到的是当前处于活跃的图片对应的索引
            total是图片总数
      -->
      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span
              class="item"
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span>
                {{ getName(value[0].title) }}
              </span>
              <span
                class="count"
                v-if="swipeData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

const swipeGroup = {}

for (const item of props.swipeData) {
  let arr = swipeGroup[item.enumPictureCategory]
  if (!arr) {
    swipeGroup[item.enumPictureCategory] = []
  } else {
    arr.push(item)
  }
}
// console.log(swipeGroup)
const getName = (name) => {
  return name.replace('：', '').replace('【', '').replace('】', '')
}

const getCategoryIndex = (item) => {
  const arr = swipeGroup[item.enumPictureCategory]
  return arr.findIndex(data => data === item) + 1
}
</script>

<style lang="less" scoped>
.swipe-list {
  .item {
    img {
      width: 100%;
    }
  }

  .indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    display: flex;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);

    .item {
      margin: 0px 5px;
      border-radius: 2px;

      &.active {
        padding: 0 3px;
        background-color: #fff;
        color: #333;
      }
    }
  }
}
</style>