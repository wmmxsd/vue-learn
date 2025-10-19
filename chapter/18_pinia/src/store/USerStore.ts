import { defineStore } from 'pinia'
import { User } from '@/types/USer'
import { ref } from 'vue'

/* export const userInfoStore = defineStore('userInfo', {
  state: () => ({
    user: new User(111, '张三', 18) as User,
  }),
  getters: {
    // 箭头函数写法：const add = (a, b) => {return a + b}
    getUser: (state) => state.user,
    getUserName(state):string {
      return state.user.name
    }
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
  },
}) */

  export const userInfoStore = defineStore('userInfo', () =>{
    const user = ref(new User(111, '张三', 18))
    const getUser = () => user.value

    const getUserName = () => user.value.name

    const setUser = (newUser: User) => user.value = newUser

    return {
      user,
      getUser,
      getUserName,
      setUser
    }
  })


