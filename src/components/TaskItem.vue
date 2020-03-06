<template>
    <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
            <b-row>
                <b-col md="9" order-md="2">
                    <div>{{short_description}}</div>
                </b-col>
                <b-col md="3" order-md="1">
                    <b-button squared size="sm" href="#" v-b-toggle="name" class="btn w-100" :class="[task.completed ? 'btn-info' : 'btn-warning']">more...</b-button>
                </b-col>
            </b-row>
        </b-card-header>
        <b-collapse :id="name" accordion="my-accordion" role="tabpanel">
            <b-card-body>
            <b-card-text>Owner: {{owner}}</b-card-text>
            <b-card-text>Completed : {{completed}}</b-card-text>
            <b-card-text>Description : {{description}}</b-card-text>
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
            id: this.task.id,
            description : this.task.description,
            short_description: this.task.short_description,
            completed : this.task.completed,
            created_on: this.task.created_on,
            owner: this.task.owner,

            name: this.task.id.toString(),
        }
    },  
    computed:{}

}
</script>

<style>

</style>

