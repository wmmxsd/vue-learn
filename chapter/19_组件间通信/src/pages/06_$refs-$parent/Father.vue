<template>
	<div class="father">
		<h3>父组件</h3>
		<h4>房产：{{ house }}</h4>
		<button @click="changeToy">修改Child1的玩具</button>
		<button @click="changeComputer">修改Child2的电脑</button>

    <!-- $refs包含了所有带有ref属性的子组件或DOM元素的引用。 -->
    <button @click="getAllChild($refs)">让所有孩子的书变多</button>

    <!-- 在父组件中引用子组件Child1。
      - 通过ref="c1"为子组件实例创建一个引用标识
      - 父组件可以通过let c1 = ref()访问该子组件实例
      - 可以调用子组件的方法或访问其数据属性 -->
    <Child1 ref="c1"/>
		<Child2 ref="c2"/>
	</div>
</template>

<script setup lang="ts" name="Father">
	import Child1 from './Child1.vue'
	import Child2 from './Child2.vue'
	import { ref,reactive } from "vue";
	const c1 = ref()
	const c2 = ref()

	// 注意点：当访问obj.c的时候，底层会自动读取value属性，因为reactive对象中ref对象会被自动解包
	const obj = reactive({
		a:1,
		b:2,
		c:ref(3)
	})
	const x = ref(4)
  //不用添加value属性
	console.log(obj.c)
	console.log(x.value)


	// 数据
	const house = ref(4)
	// 方法
	function changeToy(){
    console.log('c1', c1, 'c1.value', c1.value)
		c1.value.toy = '小猪佩奇'
	}
	function changeComputer(){
		c2.value.computer = '华为'
	}
	function getAllChild(refs:{[key:string]:any}){
		console.log(refs)
		for (const key in refs){
      // refs[key]意思是获取对象中属性的值。refs['c1']、refs['c2']
      console.log(key, refs[key])
			refs[key].Book += 3
		}
	}
	// 向外部提供数据
	defineExpose({house})
</script>

<style scoped>
	.father {
		background-color: rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
	}

	.father button {
		margin-bottom: 10px;
		margin-left: 10px;
	}
</style>

