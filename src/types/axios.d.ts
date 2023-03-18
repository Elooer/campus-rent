interface AxiosRes<T> {
  flag: boolean
  msg: string
  data?: T
}

type PromiseRef<T = {}> = Promise<AxiosRes<T>>

interface RegisterFormItf {
  username: string
  password: string
}

interface PullMsg {
  myUid: number
  friendUid: string
}

interface AddGoods<T> {
  goodsName: T
  goodsPrice: T
  goodsDescribe: T
  goodsTime: T
  goodsPicture: T
}
