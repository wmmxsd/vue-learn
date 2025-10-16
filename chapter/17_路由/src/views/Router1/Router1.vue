<template>
  <div class="router1">
    <h2>Router1</h2>

    <!-- 当前路由信息 -->
    <div class="info">
      <div><strong>路径:</strong> {{ route.fullPath }}</div>
      <div><strong>name:</strong> {{ route.name }}</div>
      <div><strong>params:</strong> <pre>{{ params }}</pre></div>
      <div><strong>query:</strong> <pre>{{ query }}</pre></div>
    </div>

    <!-- 链接示例 -->
    <nav class="links">
      <router-link to="/">首页 (/)</router-link>
      <router-link to="/router2">Router2 (/router2)</router-link>
      <router-link :to="{ path: '/user/42', query: { id: 'router1' } }">用户 42 (/user/42?id=router1)</router-link>
    </nav>

    <!-- 编程式导航示例 -->
    <div class="actions">
      <button @click="goBack">后退</button>
      <button @click="goHome">去首页 (push)</button>
      <button @click="openUser(100)">打开用户 100 (push)</button>
      <button @click="replaceWith('/about')">替换为 /about (replace)</button>
      <button @click="pushWithQuery">添加 query (push)</button>
    </div>

    <!-- 插槽位置：如果作为父路由有子路由，展示子路由内容 -->
    <!-- <RouterView /> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute, type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from 'vue-router'
import router1Hooks from "./router1-hooks/Router1.ts";

router1Hooks()

const router = useRouter()
const route = useRoute()

// 便于调试显示
const params = computed(() => JSON.stringify(route.params, null, 2))
const query = computed(() => JSON.stringify(route.query, null, 2))

function goBack() {
  // 若无历史则回到首页
  if (window.history.length > 1) {
    router.back()
  } else {
    router.replace('/')
  }
}

function goHome() {
  router.push('/')
}

function openUser(id: unknown) {
  // 示例：路由参数 + query
  router.push({ path: `/user/${id}`, query: { from: 'router1' } })
}

function replaceWith(path: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric) {
  router.replace(path)
}

function pushWithQuery() {
  // 在当前路径上添加/修改 query（保持 path）
  router.push({ path: route.path, query: { ...route.query, added: '1' } })
}
</script>

<style scoped>
.router1 {
  padding: 16px;
  font-family: Arial, Helvetica, sans-serif;
}
.info {
  margin-bottom: 12px;
  background: #f8f9fb;
  padding: 8px;
  border-radius: 4px;
}
.links {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
}
.actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
button {
  padding: 6px 10px;
  border: 1px solid #bbb;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}
button:hover { background: #f3f3f3; }
pre {
  margin: 0;
  display: inline-block;
}
</style>
