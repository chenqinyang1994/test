import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home.vue'
// import List from '../components/List.vue'
// import Add from '../components/Add.vue'
// import Collect from '../components/Collect.vue'
// import Detail from '../components/Detail.vue'
Vue.use(VueRouter)
export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/home',
            component: () => import('../components/Home.vue'),
            meta: {
                keepAlive: true,
                title:'首页'
            }
        },
        {
            path: '/add',
            component: () => import('../components/Add.vue'),
            meta: {
                title:'添加'
            }
        },
        {
            path: '/collect',
            component: () => import('../components/Collect.vue'),
            meta: {
                title:'收藏'
            }
        },
        {
            path: '/list',
            component: () => import('../components/List.vue'),
            meta: {
                title:'列表'
            }
        },
        {
            //  /detail/1  {bid:1}  路径参数，必须有但是可以随机
            path: '/detail/:bid',
            component: () => import('../components/Detail.vue'),
            name: 'detail',
            meta: {
                title:'详情'
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})