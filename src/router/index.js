import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Login from '../components/Login.vue'
import Registration from '../components/Registration.vue'
import Welcome from '../components/Welcome.vue'
import PostAd from '../components/PostAd.vue'
import AdminProfile from '../components/AdminProfile.vue'
import Cart from '../components/Cart.vue'
import VehicleDetails from '../components/VehicleDetails.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/home',
            name: 'HomePage',
            component: HomePage
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        },
        {
            path: '/vehicle/details',
            name: 'VehicleDetails',
            component: VehicleDetails
        },
        {
            path: '/post/ad',
            name: 'PostAd',
            component: PostAd
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/registration',
            name: 'Registration',
            component: Registration
        },
        {
            path: '/adminProfile',
            name: 'AdminProfile',
            component: AdminProfile
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})