<template>
  <ul class="list">
    <li v-for="ip in ipList" v-bind:key="ip">
<RouterLink :to="{ path: `/router3/info`, query: { id: `${ip}` } }">{{ ip }}</RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const ipList = ref([
  '192.168.118.10',
  '192.168.118.11',
  '192.168.118.12'])
</script>

<style lang="css" scoped>
list {
  color: black;
}
</style>
