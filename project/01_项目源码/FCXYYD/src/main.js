// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 加载 axios 
import axios from "axios";
// 赋值到 vue的原型上
Vue.prototype.$axios=axios;
// this.$axios ==> 访问原型上面的   axios
// 组件  this==> vue实例

// 加载vue-awesome-swiper 插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles   加载样式
import 'swiper/dist/css/swiper.css'
// vue使用插件
Vue.use(VueAwesomeSwiper)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
