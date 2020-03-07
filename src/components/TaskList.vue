<template>
    <b-list-group>
        <b-list-group-item v-for="task in d_tasks" :key="task.id" class="p-0">
            <TaskItem :task="task" @updateTask="onUpdateTask"></TaskItem>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import TaskItem from './TaskItem'
export default {

    props:{
        tasks:{
            type:Array,
        }
    },

    data(){
        return {
            d_tasks: this.tasks 
            
        }
    },

    watch:{
        tasks(val){
            this.d_tasks = val;
        }
    },

    components:{
        TaskItem
    },

    mounted(){

    },

    methods:{
        onUpdateTask(task){
            this.$emit('updateTask', task)
        }
    }
}
</script>

<style>

</style>