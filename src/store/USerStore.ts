import { defineStore } from 'pinia'
import { User } from '@/types/USer'

export const useruserInfoStore = defineStore('userInfo', {
  state: () => ({
    user: new User(111, '张三', 18) as User,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
  },
})
