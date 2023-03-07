import { defineStore } from 'pinia'

type UserList = {
  id: string
  username: string
  avatar: string
}[]

interface State {
  token: string
  userList: UserList
}

export const useMainStore = defineStore('main', {
  state: (): State => {
    return {
      token: '',
      userList: [],
    }
  },
  actions: {
    changeUserList(newValue: UserList) {
      this.userList = newValue
    },
  },
})
