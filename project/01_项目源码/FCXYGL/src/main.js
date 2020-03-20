// import 保存的变量名称   from '资源路径'
import Vue from 'vue' //  加载vue框架 下载到 nonde_modules文件夹里面
import App from './App' //  默认的组件模板
import router from './router' // 加载路由    注意 ：默认加载文件夹下面的index.js

// vue 的提示
Vue.config.productionTip = false
    //3. 在main.js中加载 store.js   注入到 vue实例中
import store from "./vuex/store.js"

// 加载 axios 插件   ==》 赋值到  vue的原型里面 
import axios from 'axios';
Vue.prototype.$axios = axios;
// 每一个组件都是 vue的一个实例  =-=》访问 vue 原型上的  $axios
// 访问  this.$axios()

// 加载 adminStore 
import adminStore from './vuex/adminStore.js';
// 赋值到vue的原型上
Vue.prototype.$adminStore = adminStore;

// 加载 studentStore
import studentStore from './vuex/studentStore.js'
// 把 加载 studentStore  赋值到 vue的原型上
Vue.prototype.$studentStore = studentStore;

// 加载 videoStore
import videoStore from './vuex/videoStore.js'
// 把 加载 videoStore  赋值到 vue的原型上
Vue.prototype.$videoStore = videoStore;

// 加载 courseStore
import courseStore from './vuex/courseStore.js'
// 把 加载 courseStore  赋值到 vue的原型上
Vue.prototype.$courseStore = courseStore;


// 加载 courseEditStore
import courseEditStore from './vuex/courseEditStore.js'
// 把 加载 courseEditStore  赋值到 vue的原型上
Vue.prototype.$courseEditStore = courseEditStore;

new Vue({
    el: '#app', //挂载的元素   index.html中
    router, // 路由
    store, // key和value都是  store 时 ，简写 store
    template: '<App/>', // 模板
    components: { App } // 默认显示的模板组件
})