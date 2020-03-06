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
            role: '',
            accesstoken: ''
        },

        users: [],

        
    },

    mutations:{

        saveTask(state, payload){
            state.tasks.push(payload) 
        },

        getTasks(state, payload){
            state.tasks = payload   
        },
        getUsers(state, payload){
            state.users = payload   
        },
        saveUser(state, payload){
            state.user = payload.data
            state.tasks = payload.data.tasks
        },
        saveUserData(state, payload){
            state.user.id = payload.id
            state.user.username = payload.username
            state.user.email = payload.email
            state.user.role = payload.role
            state.user.accesstoken = payload.accesstoken
        }
    },

    actions:{


       

        addTask(context, payload){
            
        return new Promise((resolve, reject) => {
            let url = 'http://localhost:8080/task/save'
            axios.post(url, payload).then((result) => {
                context.commit('saveTask', result.data)
                resolve()
            }).catch((error) => {
                reject(error)
            })  
        })
           
              
        },
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

        getUsers(context){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/user/all/'
                axios.get(url).then((result) => {
                    context.commit('getUsers', result.data)
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