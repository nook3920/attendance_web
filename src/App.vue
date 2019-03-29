<template>
  <v-app>
    <!-- <sidebar></sidebar> -->
    <toolbar></toolbar>
    <v-content>
      <v-container fluid>
        <v-snackbar 
          v-model="snackbar"
          :timeout="timeout"
          :color="color"
          top
          >
            {{  message }}
        </v-snackbar>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/core/Sidebar'
import Toolbar from './components/core/Toolbar'
import EventBus from './eventBus'
export default {
  name: 'app',
  components: {
    Sidebar,
    Toolbar
  },
  data () {
    return {
      message: 'Hello World',
      snackbar: false,
      timeout: 3000,
      color: 'success'
    }
  },
  created () {
  },
  mounted() {
    EventBus.$on('NOTI', (payload) => {
      this.message = payload.message
      this.color = payload.color
      this.snackbar = true
    })
    if(this.$store.getters.getName){
      console.log(this.$store.getters.getName)
      this.$store.dispatch('noti', {
        message: `Logged in as ${this.$store.getters.getName}`,
        color: 'success'
      })
    }
  },
  created() {
    
  }
}
</script>

<style>
.v-content {
  background-image: url('./assets/BG.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  -o-background-size: 100% 100%, auto;
  -moz-background-size: 100% 100%, auto;
  -webkit-background-size: 100% 100%, auto;
  background-size: 100% 100%, auto;
}
</style>