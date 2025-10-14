import { ref } from 'vue'

export function getSum() {
  const sum = ref(0)

  function add() {
    sum.value++
  }

  // 暴露给外部使用
  return {
    sum,
    add
  }
}
