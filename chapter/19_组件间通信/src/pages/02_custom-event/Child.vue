<template>
  <div class="child">
    <h3>子组件</h3>
		<h4>玩具：{{ toy }}</h4>
		<button @click="emit('SendToToy',toy)">测试</button>
  </div>  
</template>

<script setup lang="ts" name="Child">
	import { ref } from "vue";
	// 数据
	const toy = ref('奥特曼')
	// 接收父组件传的自定义事件
  const emit = defineEmits(['SendToToy'])
</script>

<style scoped>
	.child{
		margin-top: 10px;
		background-color: rgb(76, 209, 76);
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>
