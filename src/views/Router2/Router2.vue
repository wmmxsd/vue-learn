<template>
  <section class="router2">
    <h2>Router2 示例</h2>

    <nav class="links">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link :to="{ path: `/user/123`, query: { ref: 'router2' } }">用户 123</router-link>
    </nav>

    <div class="controls">
      <button @click="go('/')">跳转 /</button>
      <button @click="go('/about')">跳转 /about</button>
      <button @click="goToUser(456)">跳转到用户 456</button>
      <button @click="pushQuery()">给当前路径添加 query</button>
      <button @click="replaceWith('/replaced')">replace /replaced</button>
      <button @click="back">后退</button>
      <button @click="forward">前进</button>
    </div>

    <section class="info">
      <h3>当前路由信息</h3>
      <p>fullPath: {{ route.fullPath }}</p>
      <p>path: {{ route.path }}</p>
      <p>params: {{ JSON.stringify(route.params) }}</p>
      <p>query: {{ JSON.stringify(route.query) }}</p>
      <p>hash: {{ route.hash }}</p>
    </section>

    <!-- 可放置子路由 -->
    <router-view />
  </section>
</template>

<script setup lang="ts" name="RouterTwo">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function go(path: string) {
  router.push(path).catch(() => {})
}

function goToUser(id: number) {
  router.push({ path: `/user/${id}` }).catch(() => {})
}

function pushQuery() {
  // 在当前路径追加一个查询参数（不会清除已有 query）
  const newQuery = { ...route.query, addedBy: 'router2', t: String(Date.now()) }
  router.push({ path: route.path, query: newQuery }).catch(() => {})
}

function replaceWith(path: string) {
  router.replace(path).catch(() => {})
}

function back() {
  router.back()
}

function forward() {
  router.forward()
}
</script>

<style scoped>
.router2 {
  padding: 16px;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

.links {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.controls button {
  padding: 6px 10px;
  border: 1px solid #dcdcdc;
  background: #fafafa;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #f0f0f0;
}

.info p {
  margin: 4px 0;
  font-size: 13px;
  color: #333;
}
</style>