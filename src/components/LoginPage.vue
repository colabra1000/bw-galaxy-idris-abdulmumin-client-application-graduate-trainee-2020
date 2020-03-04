<template>
  <b-container>
        <b-card>

                <div class="display-4 text-center my-4">Login</div>
                <b-col md="6" offset-md="3">
                    <b-form @submit="onSubmit">
                        <b-row class="my-1">
                            <b-col sm="3">
                                <label for="username">User Name:</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input required v-model="form.username" id="username" :state="null" placeholder="No validation"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="my-1">
                            <b-col sm="3">
                                <label for="password">Password:</label>
                            </b-col>
                            <b-col sm="9">
                                <b-form-input required v-model="form.password" type="password" id="password" :state="null" placeholder="No validation"></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" offset-sm="3">
                                <b-button type="submit" variant="primary">Submit</b-button>
                            </b-col>
                        </b-row>
                    </b-form>
            </b-col>
      </b-card>
  </b-container>
</template>

<script>
export default {
    data(){
        return {
            form: {
                username: '',
                password: '',
            }
        }
    },

    methods:{
        onSubmit(evt){
            evt.preventDefault()
            this.$store.dispatch("login", { 'username' : this.form.username,
                                            'password': this.form.password
            }).then(() =>{
                console.log('mee')
                console.log(this.$store.state.user)
                // this.$router.push({name :'tasks'})
            }).catch((error) => {
                console.log(error)
                //  this.$router.push({name :'tasks'})
            })
            // console.log(JSON.stringify(this.form))
        }
    }

}
</script>

<style>

</style>
