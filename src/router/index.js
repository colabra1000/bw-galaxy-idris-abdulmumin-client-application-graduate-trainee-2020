import Router from 'vue-router'
import Vue from 'vue'

import BasePage from '../components/BasePage'
import LoginPage from '../components/LoginPage'
import AddUserPage from '../components/AddUserPage'
import LandingPage from '../components/LandingPage'
import Store from '../store'

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
                    beforeEnter: (to, from, next) =>{
                            next()
                        if(!Store.getters.authenticated){
                            next()
                        }else{
                            // next('/tasks')
                        }
                      
                    }
                },
                {
                    path: 'register',
                    name: 'register',
                    component: AddUserPage,
                    beforeEnter: (to, from, next) => {
                        if(Store.getters.authenticated&&Store.getters.isAdmin){
                            next()
                        }else{
                            next('/login')
                        }
                    }
                },
                {
                    path: 'tasks',
                    name: 'tasks',
                    component: LandingPage,
                    beforeEnter: (to, from, next) => {
                        
                        // console.log(localStorage)
                        console.log(Store.getters.authenticated)

                     if(Store.getters.authenticated){
                         next()
                        
                     }else{
                         next('/login')
                     }
                        
                    }
                },
            ]
        }
    ]
}

export default new Router({
    routes: configRoutes()
})