import Vue from 'vue'
//这样直接应用vue 引用的并不是vue.js 是runtime
//vue=compiler+runtime(compiler可以编译模板)
//compiler有6k
import App from './App.vue'//自己写的，是一个文件模块，应该加  ./
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'http://img5.imgtn.bdimg.com/it/u=4289278818,3126321099&fm=200&gp=0.jpg',
    loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526618221822&di=83d663d6f63dae5ef9b0b2b254aa3c10&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0142eb5992b0650000002129b61cfc.gif',
    attempt: 1
})

//进入路由之前 ，诶一次都会执行此方法， 全局钩子
router.beforeEach(function (to, from, next) {
    document.title = to.meta.title;
    next()
})

Vue.use(VueAwesomeSwiper)
new Vue({
    //render是将虚拟的dom渲染成真实dom
    //createElement返回是虚拟的dom
    render: (c) => c(App),
    router
}).$mount("#app");