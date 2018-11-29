import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import Message from './plugins/message'
import './filters'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSweetalert2 from './plugins/vue-sweetalert2'

Vue.use(ElementUI);
Vue.use(VueSweetalert2);
Vue.use(Message);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
