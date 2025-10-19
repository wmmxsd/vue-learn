<template>
	<div class="child">
		<h3>子组件</h3>
    <!-- 如果中间的组件也要使用$attrs，
     那么需要将$attrs绑定到子组件上，
     不能使用defineProps(['a', 'b', 'c', 'd', 'x', 'y', 'e', 'updateA']) -->
		<h4>$attrs：{{ $attrs }}</h4>
    <h4>a：{{ $attrs.a }}</h4>
		<h4>b：{{ $attrs.b }}</h4>
		<h4>c：{{ $attrs.c }}</h4>
		<h4>d：{{ $attrs.d }}</h4>
		<h4>x：{{ $attrs.x }}</h4>
		<h4>e：{{ $attrs.e }}</h4>
		<h4>e.e1：{{ $attrs.e.e1 }}</h4>
		<h4>e.e2：{{ $attrs.e.e2 }}</h4>
    <button @click="$attrs.updateA(2)">点我将父组件那的a更新</button>
    <!--
      $attrs是一个对象，包含所有父组件传入的标签信息。
      可以用于父组件向孙组件传递数据。
      -->
		<GrandChild v-bind="$attrs"/>
	</div>
</template>

<script setup lang="ts" name="Child">
	import GrandChild from './GrandChild.vue'
</script>

<style scoped>
	.child{
		margin-top: 20px;
		background-color: skyblue;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px black;
	}
</style>
