import Vue from 'vue'
//这样直接应用vue 引用的并不是vue.js 是runtime
//vue=compiler+runtime(compiler可以编译模板)
//compiler有6k
import App from './App.vue'//自己写的，是一个文件模块，应该加  ./
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
new Vue({
    //render是将虚拟的dom渲染成真实dom
    //createElement返回是虚拟的dom
    render: (c) => c(App),
    router
}).$mount("#app");