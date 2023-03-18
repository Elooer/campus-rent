import axios from '../utils/axios'

export const addFriend = (data: PullMsg): PromiseRef =>
  axios.put('/message/addFriend', data)

export const getFriends = (): PromiseRef => axios.get('/message/getFriends')

export const pullMsg = (data: PullMsg): PromiseRef =>
  axios.post('/message/pullMsg', data)
