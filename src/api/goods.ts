import axios from '../utils/axios'

export const addGoods = (data: any): PromiseRef =>
  axios.put('/goods/addGoods', data)

export const getAllGoods = (): PromiseRef => axios.get('/goods/findAllGoods')
