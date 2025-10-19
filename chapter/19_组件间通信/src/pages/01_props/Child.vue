<template>
  <div class="child">
    <h3>子组件</h3>
		<h4>玩具：{{ toyFromChild }}</h4>
		<h4>父给的车：{{ car }}</h4>
    <!-- 这里的getToy是父组件给的getToy(value)函数，这里点击按钮会把子组件的toy值传递给父组件 -->
		<button @click="getToy(toyFromChild)">把玩具给父亲</button>
  </div>
</template>

<script setup lang="ts" name="Child">
	import {ref} from 'vue'
	// 数据
	const toyFromChild = ref('奥特曼')
	// 声明接收props
	defineProps(['car','getToy'])
</script>

<style scoped>
	.child{
		background-color: skyblue;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>
