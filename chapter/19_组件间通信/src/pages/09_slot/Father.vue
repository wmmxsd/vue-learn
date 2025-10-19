<!--
 插槽 (Slot)
插槽是 Vue 组件间内容分发的一种机制，允许父组件向子组件插入自定义内容
它类似于 HTML 中的 <slot> 元素，作为一个内容占位符存在
子组件通过定义 <slot> 标签来声明可以被父组件填充的位置
父组件可以在使用子组件时，将模板片段传入到子组件的插槽位置
 -->
<template>
  <div class="father">
    <h3>父组件</h3>
    <div class="content">
      <Game>
        <template v-slot="slotWithNoName">
          <h2>{{ slotWithNoName.game.title }}</h2>
          <ul>
            <li v-for="y in slotWithNoName.game.data" :key="y.id">
              {{ y.name }}
            </li>
          </ul>
        </template>
        <template v-slot:slot2>
          <h2>{{ soft.title }}</h2>
          <ul>
            <li v-for="s in soft.data" :key="s.id">
              {{ s.name }}
            </li>
          </ul>
        </template>
        <!--
        具名插槽 (Named Slot)
          具名插槽是带有特定名称的插槽，用于在子组件中定义多个不同的插槽位置
          通过在 <slot> 标签上添加 name 属性来定义具名插槽
          在父组件中使用 v-slot:name 或简写 #name 来指定要插入到哪个具名插槽的内容
        -->
        <template #slot3="slot3">
          <h2>{{ slot3.needUpdateSoft.title }}</h2>
          <ul>
            <li v-for="needUpdateSoft in slot3.needUpdateSoft.data" :key="needUpdateSoft.id">
              {{ needUpdateSoft.name }}
            </li>
          </ul>
        </template>
      </Game>

      <Game>
        <template v-slot="slotWithNoName">
          <h2>{{ slotWithNoName.game.title }}</h2>
          <ul>
            <li v-for="y in slotWithNoName.game.data" :key="y.id">
              {{ y.name }}
            </li>
          </ul>
        </template>
      </Game>

      <Game>
        <!-- 默认插槽（没有name的slot标签）：父组件要向没有name属性的 <slot> 标签的子组件插入内容,有以下三种写法 -->
        <!-- <template #default="{ game }"> -->
        <!-- <template v-slot:default="{ game }"> -->
        <template v-slot="{ game }">
          <h2>{{ game.title }}</h2>
          <h3 v-for="g in game.data" :key="g.id">{{ g.name }}</h3>
        </template>
      </Game>

    </div>
  </div>
</template>

<script setup lang="ts" name="Father">
import { reactive } from 'vue';
import Game from './Game.vue'

const soft = reactive({
  title: "软件排行榜",
  data: [
    { id: 's1', name: '微信' },
    { id: 's2', name: 'QQ' },
    { id: 's3', name: '抖音' },
    { id: 's4', name: '淘宝' }
  ]
})
</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}

.content {
  display: flex;
  justify-content: space-evenly;
}

img,
video {
  width: 100%;
}

h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
