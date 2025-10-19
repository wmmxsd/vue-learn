import { customRef } from "vue"

export default function (initialValue: number) {
  // 创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用：
  let timeout: number

  const debunceCount = customRef((track, trigger) => {
    return {
      get() {
        track()
        return initialValue
      },
      set(newValue: number) {
        if (timeout) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          initialValue = newValue
          trigger()
        }, 2000)
      },
    }
  })

  return {debunceCount}
}
