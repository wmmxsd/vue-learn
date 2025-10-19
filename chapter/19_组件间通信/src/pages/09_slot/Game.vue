<template>
  <div class="game">
    <!-- 子组件通过定义 <slot> 标签来声明可以被父组件填充的位置 -->
    <slot :game="game" x="哈哈" y="你好"></slot>
    <slot name="slot2"></slot>
    <slot name="slot3" :needUpdateSoft="needUpdateSoft"></slot>
  </div>
</template>

<script setup lang="ts" name="Game">
import { reactive, ref } from 'vue'
const game = reactive({
  title: "游戏排行榜",
  data: [
    { id: 'asgytdfats01', name: '英雄联盟' },
    { id: 'asgytdfats02', name: '王者农药' },
    { id: 'asgytdfats03', name: '红色警戒' },
    { id: 'asgytdfats04', name: '斗罗大陆' }
  ]
})

const needUpdateSoft = ref({
  title: "待更新软件",
  data: [
    { id: 'u1', name: '支付宝' },
    { id: 'u2', name: 'BiliBili' },
    { id: 'u3', name: '京东' },
    { id: 'u4', name: '日历' }
  ]
})
</script>

<style scoped>
.game {
  width: 200px;
  /* height: 300px; */
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
