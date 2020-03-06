
<template>
    <b-card>
        <b-row>
            <b-col sm="8" offset-sm="4">
                <b-button v-b-toggle="'addTask'"  mx-3 my-3 variant="outline-success">Add Task</b-button>
                <b-button @click="goToAddUser"  class="mx-3 my-3" variant="outline-warning">Add User</b-button>
            </b-col>
        </b-row>

        <AddTask :collapseId="'addTask'" :mappedUsers="mappedUsers" @TaskSubmit="onSubmitNewTask"></AddTask>

        

        <TaskList :tasks="mappedTasks"></TaskList>

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

             this.$store.dispatch("getUsers").then(()=>{
                this.mapUser()
            }).catch((error)=>{
                console.log(error)
            }) 


            //gets tasks for user
            this.$store.dispatch("getTasks").then(()=>{
                this.mapTask()
            }).catch((error)=> {
                console.log(error)
            })

           
        },

         mapUser(){

            
            this.mappedUsers = this.users.map((user)=>{
                return {
                   value : user.id,
                    text : user.username,
                }
            })

            this.$forceUpdate

            console.log(this.mappedUsers);

        },
         mapTask(){

            this.mappedTasks = this.tasks.map((task)=>{
                return {
                   id: task.id,
                    description: task.description,
                    short_description: task.short_description,
                    completed: task.completed,
                    owner: this.mappedUsers.filter((user) => {
                        return task.owner == user.value
                    })[0].text,
                    created_on: task.created_on,
                }
            })



            this.$forceUpdate

            console.log(this.mappedTasks)

        }
    },

    computed:{

        tasks(){
            return this.$store.state.tasks
        },

        users(){
            return this.$store.state.users
        },

    }
}
</script>

<style>

</style>