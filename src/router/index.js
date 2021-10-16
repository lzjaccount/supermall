import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')
const Detai = () => import('../views/detai/Detai')
Vue.use(Router)
const routes = [
    {
        path: '',
        redirect: '/home'
    }, {
        path: '/home',
        component: Home
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/profile',
        component: Profile
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/detai/:iid',
        component: Detai
    }
]
export default new Router({
    routes,
    mode: 'history'
})
//解决vue-router3.0版本以上重复路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

