import { reactive } from 'vue'
import axios from 'axios'

export default function getDogList() {
  const dogList = reactive<string[]>([])

  // 创建一个包含10个元素的空数组，每个元素初始值为 undefined
  Array.from({ length: 10 }).forEach(() => {
    getDog()
  })

  async function getDog() {
    /* axios.get('https://dog.ceo/api/breed/husky/images/random')
    .then(res => {
      dogList.push(res.data.message)
    }).catch(err => {
      console.log(err)
    }) */

    // async函数中使用await关键字实现等待异步结果返回后再执行后面的代码
    try {
      const res = await axios.get('https://dog.ceo/api/breed/husky/images/random')
      dogList.push(res.data.message)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dogList.push('')
    }
  }

  // 暴露给外部使用
  return {
    dogList
  }
}
