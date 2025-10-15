<template>
  <section class="router3">
    <h2>Router3 - 路由示例</h2>

    <div class="info">
      <p>当前路径: <strong>{{ route.fullPath }}</strong></p>
      <p>路由名: <strong>{{ route.name ?? '未命名' }}</strong></p>
      <p>params: <code>{{ JSON.stringify(route.params) }}</code></p>
      <p>query: <code>{{ JSON.stringify(route.query) }}</code></p>
    </div>

    <nav class="links">
      <router-link to="/">首页</router-link>
      <router-link :to="{ path: '/person/123' }">Person 123</router-link>
      <!-- 跳转到Router3的子路由组件 -->
      <router-link :to="{ path: '/router3/list' }">Router3子页面</router-link>
    </nav>

    <div class="controls">
      <label>
        目标 id:
        <input v-model="targetId" placeholder="输入 id (如 42)" />
      </label>
      <button @click="pushToId">前往 id (push)</button>
      <button @click="replaceToId">前往 id (replace)</button>
      <button @click="goBack">后退</button>
      <button @click="goForward">前进</button>
    </div>
    <div v-show="route.fullPath == '/router3/list'" class="div-card">
      <!-- 插槽位置：如果作为父路由有子路由，展示子路由内容 -->
      <RouterView />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

defineOptions({ name: 'Router-3' })

const router = useRouter()
const route = useRoute()

const targetId = ref('')

function pushToId() {
  if (!targetId.value) return
  // 使用 path 导航，适配没有命名路由的项目
  router.push({ path: `/person/${targetId.value}`, query: { from: 'router3' } }).catch(() => { })
}

function replaceToId() {
  if (!targetId.value) return
  router.replace({ path: `/person/${targetId.value}`, query: { from: 'router3' } }).catch(() => { })
}

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

// 可用于模板显示的便捷信息
const routeInfo = computed(() => ({
  fullPath: route.fullPath,
  name: route.name,
  params: route.params,
  query: route.query,
}))
</script>

<style scoped>
.router3 {
  padding: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-family: sans-serif;
}

.router3 h2 {
  margin: 0 0 12px;
}

.info p {
  margin: 6px 0;
  font-size: 14px;
}

.links {
  margin: 12px 0;
  display: flex;
  gap: 12px;
}

.links a {
  color: #42b983;
  text-decoration: none;
}

.controls {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.controls input {
  padding: 6px 8px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
}

.controls button {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  background: #f7f7f7;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #f0f0f0;
}

.div-card {
  width: 50%;
  height: 200px;
  margin: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
</style>
