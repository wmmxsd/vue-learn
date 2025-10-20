import { createApp } from 'vue'
import App from './App.vue'
import component1 from './components/component1.vue'
import component2 from './components/component2.vue'

const app = createApp(App)

// 全局注册组件，调用组件时无需import
app.component('component1', component1)
app.component('component2', component2)

// 设置全局属性 defaultPageSize，默认每页显示20条数据
app.config.globalProperties.defaultPageSize = 20

/**
 * Vue自定义指令函数
 * @param el 指令绑定的DOM元素
 * @param binding 包含指令信息的对象，如value、oldValue、arg等属性
 * @param vnode Vue编译生成的虚拟节点
 * @param prevVNode 上一个虚拟节点（仅在更新时存在）
 */
app.directive('beauty', (el, binding, vnode, prevVNode) => {
  // 输出指令相关的所有参数信息到控制台
  console.log(el, binding, vnode, prevVNode)
  el.style.color = 'red'
  el.style.fontSize = '20px'
  el.style.fontWeight = 'bold'
  el.style.textAlign = 'center'
  el.style.backgroundColor = 'yellow'
})

app.mount('#app')
