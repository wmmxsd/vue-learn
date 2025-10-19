<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>银子：{{ money }}万元</h4>
    <h4>车子：一辆{{ car.brand }}车，价值{{ car.price }}万元</h4>
    <Child />
  </div>
</template>

<script setup lang="ts" name="Father">
import Child from './Child.vue'
import { ref, reactive, provide } from 'vue'

const money = ref(100)
const car = reactive({
  brand: '奔驰',
  price: 100
})
function updateMoney(value: number) {
  money.value -= value
}

provide('moneyContext', { money, updateMoney })

// provide('car', car) 将变量car以键名'car'的形式注入到组件树中
// - 子孙组件可以通过inject('car')来获取这个数据
// - 实现了跨层级组件间的数据传递，避免了逐层props传递的繁琐
// - 这是Vue 3的依赖注入机制，用于组件间共享数据。
provide('car', car)

</script>

<style scoped>
.father {
  background-color: rgb(165, 164, 164);
  padding: 20px;
  border-radius: 10px;
}
</style>
