import axios from '../utils/axios'

export const addGoods = (data: AddGoods<string>): PromiseRef =>
  axios.put('/goods/addGoods', data)

export const getAllGoods = (): PromiseRef => axios.get('/goods/findAllGoods')
