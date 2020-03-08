<template>
    <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1 bg-dark text-warning" role="tab">
            <b-row>
                <b-col md="9" order-md="2" class="d-flex align-items-center justify-content-center">
                    <div class="my-2">{{m_task.short_description}}</div>
                </b-col>
                <b-col md="3" order-md="1">
                    <b-button squared size="sm" href="#" v-b-toggle="name" class="btn w-100 d-flex justify-content-between align-items-center" :class="[m_task.completed ? 'btn-success' : 'btn-warning']">
                        <div></div>
                        <div class="h5" v-if="isAdmin">{{m_task.owner.toUpperCase()}}</div>
                        <div class="h5" v-else >My Task</div>
                        <div>more..</div>
                    </b-button>
                </b-col>
            </b-row>
        </b-card-header>
        <b-collapse :id="name" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            <b-card-text class="d-flex">Owner: <div class="text-primary mx-3 h5">{{m_task.owner}}</div></b-card-text>
            <b-card-text class="d-flex">Completed : <div class="text-primary mx-3 h5">{{m_task.completed}}</div></b-card-text>
            <b-card-text class="d-flex" >Created on : <div class="text-primary mx-3 h5">{{new Date(m_task.created_on).toLocaleString()}}</div></b-card-text>
            <b-card-text class="d-flex">Description : <div class="text-primary mx-3 h5">{{m_task.description}}</div></b-card-text>
            
            <b-checkbox v-if="!task.completed && !isAdmin" v-model="m_task.completed">Complete Task</b-checkbox>
            <div @click="updateTask" v-if="!task.completed && !isAdmin" class="d-flex justify-content-center"><b-button variant="primary">SAVE</b-button></div>
            
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
export default {
    props: {
        task:{
           
        }
    },

   

    data(){
        return {

            m_task: {
                id: this.task.id,
                description : this.task.description,
                short_description: this.task.short_description,
                completed : this.task.completed,
                created_on: this.task.created_on,
                owner: this.task.owner,
            },

            name: this.task.id.toString(),
        }
    },  
    
    methods:{
        updateTask(){
           
            if(!this.m_task.completed){
                return
            }
           this.$emit('updateTask', this.m_task)
        }
    },

    computed:{
        isAdmin(){
            return this.$store.getters.isAdmin
        }
    }

}
</script>

<style>

</style>

