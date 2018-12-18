import axios from 'axios'
import {getCookie, delCookie} from '@/utils/util'
import {Notification, Message} from 'element-ui'
import ls from '../utils/localStorage'

let options = {
  timeout: 80000, //  超时时间
  // withCredentials: true, //  发送跨域请求
  headers: {
    post: {'Content-Type': 'application/json'} // 设置请求
  }
}

// 请求错误处理
let axiosInstance = axios.create(options)

axiosInstance.interceptors.request.use(config => {
  let newObject = {}
  config.headers.token = getCookie('token')
  if (config.params && config.method === 'get') {
    let keys = Object.keys(config.params)
    for (let key of keys) {
      let value = config.params[key]
      if (typeof value === 'string') {
        value = value.trim()
      }
      // pageSize
      if (value || (!value && typeof value !== 'string')) {
        newObject[key] = value
      }
    }
  }

// 解决GET请求缓存
  if (config.method === 'get') {
    config.params = Object.assign({t: +new Date()}, newObject)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axiosInstance.interceptors.response.use(response => {
  let status = response.data.status;
  if (status === 200) {
    return Promise.resolve({headers: response.headers, ...(response.data || {})})
  }
  if(status === 401){
    delCookie('token');
    ls.setItem("user",null);
    /*window.location = '/auth/login/'*/
    //this.$router.push({ name: 'Login'})
  };
  Notification.error({
    title: '重口提示',
    message: response.data.message
  })


}, (error) => {
  Notification.error({
    title: '重口提示',
    message: error.data.message || '系统开小差了'
  });
  return Promise.reject(error)
});

export default axiosInstance
