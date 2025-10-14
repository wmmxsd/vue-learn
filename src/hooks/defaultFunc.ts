import {
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
} from 'vue'

export default function () {
  onBeforeMount(() => {
    console.log('UserProfile组件挂载之前')
  })

  onMounted(() => {
    console.log('UserProfile组件挂载完成')
  })

  onBeforeUnmount(() => {
    console.log('UserProfile组件卸载之前')
  })

  onUnmounted(() => {
    console.log('UserProfile组件卸载完成')
  })

  onBeforeUpdate(() => {
    console.log('UserProfile组件更新之前')
  })

  onUpdated(() => {
    console.log('UserProfile组件更新完成')
  })

  // 暴露给外部使用
  return {
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    onUnmounted,
    onBeforeUpdate,
    onUpdated
  }
}
