<template>
  <div class="app">
    <h1 class="title">VUE Router Test</h1>
    <div class="navigator">
      <RouterLink to="/router1" class="nav-link">Router 1</RouterLink>
      <RouterLink :to="{ path: '/router2' }" class="nav-link">Router 2</RouterLink>
      <RouterLink :to="{ name: 'router-333333'}" class="nav-link">Router 3</RouterLink>
    </div>
    <div class="main-content">
      <div class="content-card">
        <p>请选择上方导航项查看不同组件内容</p>
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
.app {
  background: linear-gradient(135deg, #18e39af7 0%, #0dbf7d 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  margin: 30px auto;
  max-width: 700px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.app::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  z-index: 0;
}

.title {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: 800;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  letter-spacing: 1px;
}

.navigator {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 14px 30px;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 500;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  min-width: 130px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.35);
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.8s ease;
}

.nav-link:hover::before {
  transform: translateX(100%);
}

.main-content {
  position: relative;
  z-index: 1;
}

.content-card {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.content-card:hover {
  transform: translateY(-5px);
}

.content-card p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(10deg);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app {
    margin: 15px;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }

  .navigator {
    gap: 12px;
  }

  .nav-link {
    padding: 12px 20px;
    min-width: 100px;
    font-size: 0.9rem;
  }

  .content-card {
    padding: 20px;
  }
}
</style>
