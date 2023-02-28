import { defineStore } from 'pinia'

type UserList = {
  id: string
  username: string
  avatar: string
}[]

interface State {
  userList: UserList
}

export const useMainStore = defineStore('main', {
  state: (): State => {
    return { userList: [] }
  },
  actions: {
    changeUserList(newValue: UserList) {
      this.userList = newValue
    },
  },
})
