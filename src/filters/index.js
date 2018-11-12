import Vue from 'vue'
import time from './time'

const filters = {
  time
}

// 注册filters到Vue
for (let key in filters) {
  Vue.filter(key, filters[key])
}
