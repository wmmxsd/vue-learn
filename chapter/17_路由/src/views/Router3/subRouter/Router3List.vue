<template>
  <div class="container">
    <ul class="list">
      <li v-for="ip in ipList" v-bind:key="ip">
        <RouterLink :to="{
          path: '/router3/list/info',
          query: {
            ip: `${ip}`
          }
        }">{{ ip }}</RouterLink>
      </li>
      <!-- 也可以通过 params 传递参数，但必须用name 属性，不能用path属性，且必须在路由器中的path属性里面使用占位符 -->
      <li>
        <RouterLink :to="{
          name: 'router-3-info',
          params: { ip: ipList[0] },
          query: {
            ip: `${ipList[0]}`,
            flag: 1
          }
        }">
          {{ ipList[0] }}
        </RouterLink>
      </li>
    </ul>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import router3ListHooks from "./router3List-hooks/Router3.ts";

router3ListHooks()

const ipList = ref([
  '192.168.118.10',
  '192.168.118.11',
  '192.168.118.12'])
</script>

<style lang="css" scoped>
.container {
  display: flex;
}

.container>.list {
  width: 30%;
  color: black;
}

.container .content {
  width: 70%;
}
</style>
