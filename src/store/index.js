import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers = {
    'Content-Type' : 'application/json',
    'Accept' : 'application/json',
}

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        tasks: [],
        user: {
            id: 1,
            username: '',
            email: '',
            roles: [],
        },

        accesstoken: ''
    },

    mutations:{
        getTasks(state, payload){
            state.tasks = payload   
        },
        saveUser(state, payload){
            state.user = payload.data
            state.tasks = payload.data.tasks
        },
        saveUserData(state, payload){
            state.user.id = payload.id
            state.user.username = payload.username
            state.user.email = payload.email
            state.user.roles = payload.roles

            state.accesstoken = payload.accesstoken
        }
    },

    actions:{

       

        getTasks(context){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/task/user/'+context.state.user.id
                axios.get(url).then((result) => {
                    context.commit('getTasks', result.data)
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },

        login(context, payload){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/api/auth/signin'
                axios.post(url, payload).then((result) => {
                    context.commit('saveUserData', result.data)
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },

        addUser(context, payload){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/api/auth/signup'
                axios.post(url, payload).then((result) => {
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        }
    }
})