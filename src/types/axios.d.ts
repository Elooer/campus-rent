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
