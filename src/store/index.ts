import { defineStore } from 'pinia'

type UserList = {
  uid: string
  username: string
  picture: string
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
  persist: {
    enabled: true, // 开启存储
    // **strategies: 指定存储位置以及存储的变量都有哪些,该属性可以不写，不写的话默认是存储到sessionStorage里边，默认存储state里边的所有数据**
    strategies: [
      { storage: sessionStorage, paths: ['userinfo', 'userList'] },
      // storage 存储到哪里 sessionStorage/localStorage
      // paths是一个数组,要存储缓存的变量,当然也可以写多个
      // paths如果不写就默认存储state里边的所有数据，如果写了就存储指定的变量
    ],
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
