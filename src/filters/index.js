import Vue from 'vue'
import time from './time'
import simpleMarkDown from './simpleMarkDown'

const filters = {
  time,
  simpleMarkDown
};

// 注册filters到Vue
for (let key in filters) {
  Vue.filter(key, filters[key])
}
