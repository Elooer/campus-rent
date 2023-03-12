import { defineStore } from 'pinia'

type UserList = {
  id: string
  username: string
  avatar: string
}[]

interface UserInfo {
  password: string
  picture: string
  uid: number
  username: string
}

interface State {
  token: string
  userinfo: UserInfo
  userList: UserList
}

export const useMainStore = defineStore('main', {
  state: (): State => {
    return {
      token: localStorage.getItem('camps_token') || '',
      userinfo: {
        password: '',
        picture: '',
        uid: 0,
        username: '',
      },
      userList: [],
    }
  },
  actions: {
    changeUserList(newValue: UserList) {
      this.userList = newValue
    },
    setToken(token: string) {
      console.log('set', token)
      localStorage.setItem('camps_token', token)
      this.token = localStorage.getItem('camps_token') || ''
    },
    deleteToken() {
      localStorage.removeItem('camps_token')
    },
    setUserInfo(info: any) {
      this.userinfo = info
    },
  },
})
