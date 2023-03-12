import axios from '../utils/axios'

export const registerApi = (data: RegisterFormItf): PromiseRef =>
  axios.post('/user/register', data)

export const loginApi = (data: RegisterFormItf): PromiseRef =>
  axios.get('/user/login', { params: data })

export const getUserInfo = (): PromiseRef => axios.get('/user/getUserInfo')

export const uploadAvatar = (data: any): PromiseRef =>
  axios.post('/qiniu/upload', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })

export const changeAvatar = (data: any): PromiseRef =>
  axios.post('/user/modifyUserPicture', data)
