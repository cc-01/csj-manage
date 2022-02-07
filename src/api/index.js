import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
// axios拦截器
axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 登录验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
// 删除商品分类
export const deleteCategoried = (params) => {
  return axios.delete(`categories/${params.id}`).then(res => res.data)
}

// 获取订单列表
export const getOrderList = () => {
  return axios.get('order').then(res => res.data)
}

// 查询某一个人
// export const getOne = (params) => {
//   return axios.get('order/one', { params }).then(res => res.data)
// }
export function getOne(params) {
  return axios.get('order/one', { params }).then(res => res.data)
}

// test post
export const testPost = (params) => {
  return axios.post('order/add', params).then(res => res.data)
}

export const getTwo = (params) => {
  return axios.get('order/one', { params }).then(res => res.data)
}
export const getThree = (params) => {
  return axios.get('aaa', { params }).then(res => res.data)
}
