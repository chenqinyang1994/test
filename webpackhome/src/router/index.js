import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import List from '../components/List.vue'
import Add from '../components/Add.vue'
import Collect from '../components/Collect.vue'
import Detail from '../components/Detail.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/add',
            component: Add
        },
        {
            path: '/collect',
            component: Collect
        },
        {
            path: '/list',
            component: List
        },
        {
            path: '/detail',
            component: Detail
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})