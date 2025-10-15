<template>
  <ul class="list">
    <li>ip: {{ device.ip }}</li>
    <li>mac: {{ device.mac }}</li>
    <li>cpu core nums: {{ device.cpuCoreNums }}</li>
    <li>memory content: {{ device.memoryContent }}</li>
  </ul>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

class Device {
  ip: string
  mac: string
  cpuCoreNums: number
  memoryContent: string

  constructor(ip: string, mac: string, cpuCoreNums: number, memoryContent: string) {
    this.ip = ip
    this.mac = mac
    this.cpuCoreNums = cpuCoreNums
    this.memoryContent = memoryContent
  }
}

const ipAndDeviceMap = new Map()
ipAndDeviceMap.set('192.168.118.10', new Device('192.168.118.10', '00:0c:29:0c:0c:0c', 34, '16G'))
ipAndDeviceMap.set('192.168.118.11', new Device('192.168.118.11', '00:2c:29:1c:0c:0c', 24, '16G'))
ipAndDeviceMap.set('192.168.118.12', new Device('192.168.118.12', '00:1c:29:0c:0c:8c', 14, '16G'))

const route = useRoute();

const device = computed(() => {
  const ip = String(route.query.ip || '') // 保证字符串
  return ipAndDeviceMap.get(ip) || null
})

onBeforeMount(() => {
    console.log('router3Info组件挂载之前', device.value)
  })

  onMounted(() => {
    console.log('router3Info组件挂载完成', device.value)
  })
</script>

<style lang="css" scoped>
.list {
  color: black;
}
</style>
