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
      ],
    },
  ],
})

export default router
