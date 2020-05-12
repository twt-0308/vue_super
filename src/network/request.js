import axios from 'axios'
export function request(config) {
  // 配置请求的根路径
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => { console.log(err) })
  //
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  return instance(config)
}
