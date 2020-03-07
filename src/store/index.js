import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'

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
        },

        accessToken : localStorage.getItem('user-token'),

        users: [],

        
    },

    getters:{
        authenticated(state){
            // let p = localStorage.getItem('user-token');
           let p = state.accessToken
            return p != null && p != "null"
        },

        isAdmin(state){
         
            return state.user.role == "ADMIN"
        },

        isUser(state){
            return state.user.role == "USER"
        }
    },

    mutations:{

        signOut(state){
            
            localStorage.removeItem('user-token')
            state.accessToken = null;
            
        },

        saveTask(state, payload){
            state.tasks.push(payload) 
        },

        getTasks(state, payload){
            state.tasks = payload   
        },

        taskUpdate(state, payload){
            let index = state.tasks.findIndex((item) => {
                return item.id == payload.id
            })

            state.tasks[index].completed = payload.completed
            
            
        },

        getUsers(state, payload){
            state.users = payload   
        },
       
        saveUserDataFromJwt(state, payload){
           
            let p = null
            let t = null

            
            if(payload){
                p = VueJwtDecode.decode(payload)
                localStorage.setItem('user-token', payload)
                state.accessToken = payload
            
            } 

            if(!payload){
               
                t = localStorage.getItem('user-token')
                if(t){

                    p = VueJwtDecode.decode(t)
                }
            }
           
            if(p){
               
                state.user.id = p.id,
                state.user.username = p.username
                state.user.role = p.role
                
            }
        }
    },

    actions:{

        updateTask(context, payload){

   
             
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/task/update'
                axios.put(url, payload, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {

                    context.commit('taskUpdate', result.data)
                    // context.commit('saveTask', result.data)
                    resolve()
                }).catch((error)=> {
                    reject(error)
                }) 
            })
        },


        addTask(context, payload){
                
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/task/save'
                axios.post(url, payload, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {
                    context.commit('saveTask', result.data)
                    resolve()
                }).catch((error) => {
                    reject(error)
                })  
            })
           
              
        },
        getTasksForUser(context){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/task/user/'+context.state.user.id
                axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {
                    context.commit('getTasks', result.data)
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },

        getAllTasks(context){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/task/all'
                axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {
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
                axios.get(url, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {
                    context.commit('getUsers', result.data)
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },

        login(context, payload){
           
            return new Promise((resolve) => {
                let url = 'http://localhost:8080/api/auth/signin'
                axios.post(url, payload).then((result) => {                

                    context.commit('saveUserDataFromJwt', result.data.accessToken)
                    
                    resolve()
                })
            })
        },

        addUser(context, payload){
            return new Promise((resolve, reject) => {
                let url = 'http://localhost:8080/api/auth/signup'
                axios.post(url, payload, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.accessToken
                    }
                }).then((result) => {
                    resolve(result)
                }).catch((error)=>{
                    reject(error)
                })
            })
        }
    }
})