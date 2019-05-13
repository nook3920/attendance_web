<template>
  <v-app >
    <!-- <sidebar></sidebar> -->
    <toolbar></toolbar>
    <v-content >
      <vue-particles color="#dedede"></vue-particles>
      <v-container fluid id="particles-js" fill-height> 
        <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>{{ message }}</v-snackbar>
        <transition name="slide-right" mode="out-in">
          <router-view class="child-view"></router-view>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from "./components/core/Sidebar";
import Toolbar from "./components/core/Toolbar";
import EventBus from "./eventBus";

export default {
  name: "app",
  components: {
    Sidebar,
    Toolbar
  },
  data() {
    return {
      message: "Hello World",
      snackbar: false,
      timeout: 3000,
      color: "success"
    };
  },
  created() {},
  mounted() {
    EventBus.$on("NOTI", payload => {
      this.message = payload.message;
      this.color = payload.color;
      this.snackbar = true;
    });
    if (this.$store.getters.getName) {
      console.log(this.$store.getters.getName);
      this.$store.dispatch("noti", {
        message: `Logged in as ${this.$store.getters.getName}`,
        color: "success"
      });
    }
  },
  created() {}
};

</script>

<style>
.v-content {
  background-color: rgb(0, 0, 0, 0.75);
}


.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

#particles-js {
  position : absolute;
  height: 100%;
  width: 100%;
  z-index:0;
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}

.child-view {
  position: absolute;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
</style>