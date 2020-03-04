
<template>
    <b-card>
        <b-row>
            <b-col sm="8" offset-sm="4">
                <b-button v-b-toggle="'addTask'" @click="goToAddTask"  mx-3 my-3 variant="outline-success">Add Task</b-button>
                <b-button @click="goToAddUser"  class="mx-3 my-3" variant="outline-warning">Add User</b-button>
            </b-col>
        </b-row>

        <b-collapse  :visible="collapseVisible" id="addTask" accordion="my-accordion" role="tabpanel">
            <b-card>
                <b-form @submit="onSubmit">
                

                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="owner">Task owner:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select required :state="ownerSelectOk" v-model="form.owner" :options="users" id="owner"></b-form-select>
                        
                             <b-form-invalid-feedback :state="ownerSelectOk">
                                You must select an ower.
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="ownerSelectOk">
                                Looks Good.
                            </b-form-valid-feedback>
                        
                        
                        
                        </b-col>
                    </b-row>

                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="description">Description:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input required v-model="form.description" id="description" :state="descriptionOk" placeholder="task description"></b-form-input>
                        
                            <b-form-invalid-feedback :state="descriptionOk">
                                Description must be more than 5 characters and less than 30 characters.
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="descriptionOk">
                                Looks Good.
                            </b-form-valid-feedback>
                        
                        </b-col>
                    </b-row>

                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="detailedDescription">Detailed description:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-textarea v-model="form.detailedDescription" id="detailedDescription" :state="null" placeholder="detailed description.."></b-form-textarea>
                        </b-col>
                    </b-row>

                    <b-row class="my-2">
                        <b-col sm="6" offset-sm="3">
                            <b-button type="submit" variant="outline-primary"> Submit task</b-button>
                        </b-col>
                    </b-row>

                </b-form>
            </b-card>
        </b-collapse>

        <TaskList :tasks="mappedTasks"></TaskList>

    </b-card>
</template>

<script>
import TaskList from './TaskList'
export default {

    components:{
        TaskList
    }, 

    data(){


        return{
            form:{
                description: '',
                detailedDescription: '',
                owner: '',
            },

            mappedTasks : [],

            collapseVisible: false,



            users: [
                {value: 0, text: 'Robinson'},
                {value: 1, text: 'jimada'},
                {value: 2, text: 'jimenez'},
                {value: 3, text: 'jingba'},
                {value: 4, text: 'jibulet'},
                {value: 5, text: 'jimfoza'},
                {value: 6, text: 'jacobdus'},
            ],
        }
    },


    created(){
        this.$store.dispatch("getTasks").then((result)=>{
                console.log(result);
                this.mapTask()
            }).catch((error)=> {
                console.log(error)
            })
    },

    watch:{
        $route(){
            //gets tasks for user
            this.$store.dispatch("getTasks").then((result)=>{
                console.log(result);
                this.mapTask()
            }).catch((error)=> {
                console.log(error)
            })
            // this.$store.dispatch("getUsers")
        }
    },

    methods:{
        goToAddTask(){
            
        },

        goToAddUser(){
            this.$router.push({name:'register'})
        },

        onReset(){
            this.form.description = ''
            this.form.detailedDescription = ''
            this.form.owner = ''
        },

        onSubmit(evt){
            evt.preventDefault()
 

            
            this.collapseVisible = true
            this.$nextTick(() => {
                this.collapseVisible = false
            })
            console.log(this.collapseVisible)

            this.onReset();
        },

        mapTask(){

            
            this.mappedTasks = this.tasks.map((task)=>{
                return {
                    id :task.id,
                    name: task.name,
                }
            })

            this.$forceUpdate

            console.log(this.mappedTasks);

        }
    },

    computed:{

        tasks(){
            return this.$store.state.tasks
        },

        formOk(){
            return this.descriptionOk && this.ownerSelectOk;
        },

        descriptionOk(){
            return this.form.description.trim().length > 5 &&
                    this.form.description.trim().length < 30
        },

        ownerSelectOk(){
            return this.form.owner !== '';
        }
    }
}
</script>

<style>

</style>