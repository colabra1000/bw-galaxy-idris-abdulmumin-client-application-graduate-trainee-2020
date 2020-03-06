import Router from 'vue-router'
import Vue from 'vue'

import BasePage from '../components/BasePage'
import LoginPage from '../components/LoginPage'
import AddUserPage from '../components/AddUserPage'
import LandingPage from '../components/LandingPage'

Vue.use(Router)

function configRoutes(){
    return[
        {
            path: '/',
            redirect: '/login',
            name: 'basePage',
            component: BasePage,
            children:[
                {
                    path: 'login',
                    name: 'login',
                    component: LoginPage,
                },
                {
                    path: 'register',
                    name: 'register',
                    component: AddUserPage,
                },
                {
                    path: 'tasks',
                    name: 'tasks',
                    component: LandingPage,
                },
            ]
        }
    ]
}

export default new Router({
    routes: configRoutes()
})