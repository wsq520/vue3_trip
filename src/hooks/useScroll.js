import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore'

// 方法1: 通过回调函数加载更多
// export default function useScroll1(reachBttomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = Math.ceil(document.documentElement.scrollTop)
//     const scrollHeight = document.documentElement.scrollHeight
//     // console.log(clientHeight, scrollTop, scrollHeight)
//     if (clientHeight + scrollTop >= scrollHeight) {
//       console.log('滚动到底部啦')
//       if (reachBttomCB) {
//         reachBttomCB()
//       }
//     }
//   }

//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }

// 方法2：通过变量监听是否滚动到底部
export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = Math.ceil(document.documentElement.scrollTop)
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    // console.log('滚动中~')
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log('滚动到底部啦')
      isReachBottom.value = true
    }
  }, 100)

  onMounted(() => {
    if (elRef) {
      el = elRef.value
    }
    el.addEventListener('scroll', scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollHeight, scrollTop }
}