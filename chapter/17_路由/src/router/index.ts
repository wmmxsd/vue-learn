import { createRouter, createWebHistory } from 'vue-router'
// 路由组件一般放在pages或者views目录下
import Router1 from '../views/Router1/Router1.vue'
import Router2 from '../views/Router2/Router2.vue'
import Router3 from '../views/Router3/Router3.vue'
import Router3List from '../views/Router3/subRouter/Router3List.vue'
import Router3Info from '../views/Router3/subRouter/Router3Info.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/router1',
      component: Router1,
    },
    {
      path: '/router2',
      component: Router2,
    },
    {
      name: 'router-333333',
      path: '/router3',
      component: Router3,
      children: [
        {
          path: 'list',
          component: Router3List,
          children: [
            {
              path: 'info',
              component: Router3Info,
            },
          ],
        },
        {
          name: 'router-3-info',
          // 占位符，表示这是一个动态路由，不能用数组和对象
          path: 'info/:ip',
          component: Router3Info,
          // 开启props传参，路由的params参数会被映射到组件的props中，子组件可以用defineProps接收参数
          // props: true,

          // 也可以用函数的形式，返回一个函数，参数为route对象，返回值可以为params、query等，一般为query，params一般直接用props: true
          props(route) {
            return route.query
          },
          // 也可以用对象的形式，表示传递固定的值，一般不常用
          /* props: {
            ip: '192.168.1.1',
            flag: 2
          } */
        },{
          path: '/',
          redirect: '/router3'
        }
      ],
    },
  ],
})

export default router
