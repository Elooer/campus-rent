interface RowDataList {
  uid: string
  goodsDescribe: string
  pictureHeight: number
  pictureWidth: number
  picture: string
  goodsPrice: string
  goodsPicture: string
  username: string
  goodsName: string
}

type MessageList = {
  from: number
  to: number
  message: string
  time: string | Date
}[]

interface Chat {
  msg: string
  interval: any
  messageList: MessageList
  userInfo: RowDataList
  socket: WebSocket | null
}

type FirstHandleData<T, U = number> = {
  data: T
  leftOffset?: U
  rightOffset?: U
}

type SecondHandleData<T, U = number> = {
  data: T
  leftOffset?: U
  rightOffset?: U
  leftData: T
  rightData: T
  height: U
}

type Records<T, U> = {
  data: T
  height: U
  leftData: T
  rightData: T
  leftOffset?: U
  rightOffset?: U
}[]

type UserList = {
  uid: string
  username: string
  picture: string
}[]
