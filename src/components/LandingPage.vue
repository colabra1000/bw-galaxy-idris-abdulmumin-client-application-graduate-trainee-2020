
<template>
    <b-card>
        <div v-if="isAdmin" class="d-flex justify-content-center">
            
            <b-button v-b-toggle="'addTask'"  class="mx-3 my-3" variant="outline-success">Add Task</b-button>
            <b-button @click="goToAddUser"  class="mx-3 my-3" variant="outline-warning">Add User</b-button>
            
        </div>

        <AddTask class="mt-5" :collapseId="'addTask'" :mappedUsers="mappedUsers" @TaskSubmit="onSubmitNewTask"></AddTask>

        <TaskList class="mt-5" :tasks="mappedTasks" @updateTask="updateTask"></TaskList>

    </b-card>
</template>

<script>
import TaskList from './TaskList'
import AddTask from './AddTask'
export default {

    components:{
        TaskList,
        AddTask
    }, 

    data(){


        return{
           
            mappedTasks : [],

            mappedUsers: [],

            editing: false

        }
    },


    created(){
       this.initializePage();
       
    },

    watch:{
        $route(){
            this.initializePage();
            
        }
    },

    methods:{

        goToAddUser(){
            this.$router.push({name:'register'})
        },

      

        onSubmitNewTask(form){
            console.log(form.completed)
            this.$store.dispatch("addTask", {
                description : form.detailedDescription,
                short_description : form.description,
                completed : false,
                owner : form.owner,
                created_on : new Date().toJSON(),

            }).then(() =>{
                this.mapTask()
            })

        },

        initializePage(){

            this.$store.commit('saveUserDataFromJwt')

             this.$store.dispatch("getUsers").then(()=>{
                this.mapUser()

                if(this.isAdmin){

                    this.$store.dispatch("getAllTasks").then(()=>{
    
                        this.mapTask()
                    })
                }else{
                        this.$store.dispatch("getTasksForUser").then(()=>{
        
                            this.mapTask()
                        })

                }

            })
           
        },

         mapUser(){

            
            this.mappedUsers = this.users.map((user)=>{
                return {
                   value : user.id,
                    text : user.username,
                    role : user.userRole
                }
            })

            this.$forceUpdate

           

        },
         mapTask(){

            this.mappedTasks = this.tasks.map((task)=>{
                return {
                   id: task.id,
                    description: task.description,
                    short_description: task.short_description,
                    completed: task.completed,
                    owner: this.mappedUsers.filter((item) => {
                        return task.owner == item.value
                    })[0].text,
                    created_on: task.created_on,
                }
            })

            this.$forceUpdate

        },

        updateTask(task){
            if(this.editing){
                return
            }

            this.editing = true

            this.$store.dispatch('updateTask', {
                id :task.id,
                description : task.description,
                short_description: task.short_description,
                completed : task.completed,
                owner: this.mappedUsers.filter((item) => {
                        return task.owner == item.text
                    })[0].value,
                created_on : task.created_on
            }).then (() => {
                this.mapTask()
                this.$forceUpdate
               this.editing = false
            }).catch(() => {
                this.editing = false
            })
        }
    },

    computed:{

        tasks(){
            return this.$store.state.tasks
        },

        users(){
            return this.$store.state.users
        },

        isAdmin(){
            return this.$store.getters.isAdmin
        }

    }
}
</script>

<style>

</style>