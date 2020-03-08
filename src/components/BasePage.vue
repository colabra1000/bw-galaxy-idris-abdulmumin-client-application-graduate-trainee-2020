<template>
  <div>
      <Nav></Nav>
      <b-card no-body>
            <b-card-header> 
                <div class="display-3 text-center"> Bw - Galaxytm</div> 
            </b-card-header>
            <router-view></router-view>
        </b-card>
  </div>
</template>

<script>
import Nav from './Nav'
// import Body from './Body'
export default {
    components:{
        Nav,
        // Body,
    },

    mounted(){
		
	}
}
</script>
