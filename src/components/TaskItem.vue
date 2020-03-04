<template>
    <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-row>
                <b-col md="9" order-md="2">
                    <div>{{taskName}}</div>
                </b-col>
                <b-col md="3" order-md="1">
                    <b-button squared size="sm" href="#" v-b-toggle="name" class="btn w-100" :class="[task.completed ? 'btn-info' : 'btn-warning']">more...</b-button>
                </b-col>
            </b-row>
        </b-card-header>
        <b-collapse :id="name" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            <b-card-text>Owner: {{$store.state.user.name}}</b-card-text>
            <b-card-text>Completed : {{task.completed}}</b-card-text>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
export default {
    props: {
        task:{
            default : {
                id:1,
                name: 'rob',
                completed: false,
            },
            required:false
        }
    },

    data(){
        return {
            taskName : this.task.name,
            name : this.taskName+this.task.id.toString(),
        }
    }

}
</script>

<style>

</style>

