<template>
  <b-container>
        <b-card>

            <div class="display-4 text-center my-4">Add User</div>

            <b-alert
                :show="dismissCountDown"
                dismissible
                variant="warning"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
                >

                A New User Has been Added
            </b-alert>

            <b-col md="6" offset-md="3">
                <b-form @submit="onSubmit">
                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="username">User Name:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input required v-model="form.username" id="username" :state="null" placeholder="User name"></b-form-input>
                        </b-col>
                    </b-row>
                   
                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="email">Email:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input required v-model="form.email" type="email" id="email" :state="null" placeholder="Email"></b-form-input>
                        </b-col>
                    </b-row>
                
                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="password">Password:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input required v-model="form.password" type="password" id="password" :state="null" placeholder="Password"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="my-2">
                        <b-col sm="3">
                            <label for="verify-password">Verify Password:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-input v-model="form.verifyPassword" required type="password" id="verify-password" :state="passwordMatch" placeholder="Verify password"></b-form-input>
                            <b-form-invalid-feedback :state="passwordMatch">
                                Your passwords must match.
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback :state="passwordMatch">
                                Looks Good.
                            </b-form-valid-feedback>
                        
                        </b-col>
                    </b-row>

                     <b-row class="my-2">
                        <b-col sm="3">
                            <label for="roles">Roles:</label>
                        </b-col>
                        <b-col sm="9">
                            <b-form-radio-group required
                             v-model="form.role" 
                             :options="roles"
                             id="roles"></b-form-radio-group>
                        </b-col>
                    </b-row>

                     <b-row class="my-2">
                        <b-col sm="6" offset-sm="3">
                            <b-button type="submit" variant="primary"> Submit</b-button>
                        </b-col>
                       
                    </b-row>
                     <b-row class="my-2">
                        <b-col sm="6" offset-sm="3">   
                            <b-button @click="backToTasks" size="sm" variant="outline-warning">back to Tasks</b-button>
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
        return{
            form:{
                username: '',
                password: '',
                verifyPassword: '',
                role: ['admin'],
            },

            roles: [
                {text: 'User', value: ['admin']},
                {text: 'Admin', value: ['admin', 'user']}
            ],

            dismissSecs: 30,
            dismissCountDown: 0

        }
    },

    methods:{
        onSubmit(evt){
            evt.preventDefault()

            if (this.fieldsVerified){
                this.$store.dispatch('addUser', {
                    username: this.form.username,
                    password: this.form.password,
                    email: this.form.email,
                    role: this.form.role,
                }).then((result)=>{
                    console.log(result);
                    this.showAlert()
                }).catch((error)=>{
                   console.log(error)
                    
                })
            }
        },

        backToTasks(){
            this.$router.push({name: 'tasks'})
        },

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert() {
            this.dismissCountDown = this.dismissSecs
        }
    },

    computed:{
        fieldsVerified(){
            return this.passwordMatch
        },

        passwordMatch(){
            return this.form.password == this.form.verifyPassword && 
            this.form.password.length > 0;
        }
    }
}
</script>

<style>

</style>