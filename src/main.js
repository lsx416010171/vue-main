// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Ant from 'ant-design-vue'
import './single-spa-config.js'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false

Vue.use(Ant)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
