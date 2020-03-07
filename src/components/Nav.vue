<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="warning" sticky>
        
            <b-navbar-brand href="#">Bw - GLXY</b-navbar-brand>
            
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav> -->

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-text>{{$store.state.user.username}}</b-nav-text>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>{{$store.state.user.role}}</em>
                        </template>
                        <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        methods: {
            signOut(){
                this.$store.commit("signOut")
                this.$router.push({name:'login'})
            }
        }
    }
</script>