import Router from 'vue-router'
import Vue from 'vue'

import BasePage from '../components/BasePage'
import LoginPage from '../components/LoginPage'
import AddUserPage from '../components/AddUserPage'
import TasksPage from '../components/TasksPage'

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
                    component: TasksPage,
                },
            ]
        }
    ]
}

export default new Router({
    routes: configRoutes()
})