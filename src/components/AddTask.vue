<template>
  
    <b-collapse  :visible="collapseVisible" :id="collapseId" accordion="my-accordion" role="tabpanel">
            <b-card>
                <b-form @submit="onSubmit">
                

                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="owner">Task owner:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-select required :state="ownerSelectOk" v-model="form.owner" :options="mappedUsers" id="owner"></b-form-select>
                        
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

</template>

<script>
export default {
    props:{
        collapseId:{
            required:true
        },

        mappedUsers:{
            type:Array,
            required:true,
        }
    },

    data(){
        return {
             form:{
                description: '',
                detailedDescription: '',
                owner: '',
                completed: false,
            },

            collapseVisible: false,
        }
    },

    methods:{

         onReset(){
            this.form.description = ''
            this.form.detailedDescription = ''
            this.form.owner = ''
        },

        onSubmit(evt){
            evt.preventDefault()

            this.$emit('TaskSubmit', this.form)
             
            this.collapseVisible = true
            this.$nextTick(() => {
                this.collapseVisible = false
            })

            this.onReset();
        },

    },

    computed: {
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