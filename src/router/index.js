import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Tchat from '../pages/Tchat'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }, {
            path: '/register',
            name: 'Register',
            component: Register,
        }, {
            path: '/',
            name: 'Chat',
            component: Tchat,
        },
    ],
})
