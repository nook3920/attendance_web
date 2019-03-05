<template>
  <v-toolbar 
    flat
    dense
    fixed
    absolute
    app
  >
    <v-toolbar-title>Home</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items  v-if="!isAuth">
      <v-btn to="/login" flat>login</v-btn>
      <v-divider></v-divider>
      <v-btn  flat to="/register">signup</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn flat to="/profile">{{ name }}</v-btn>
      <v-divider></v-divider>
      <v-btn @click="logOut"  flat>logout</v-btn>
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      userId: '',
      password: '',
      isSignIn: false
    }
  },
  methods:{
    logOut(){
      this.$store.dispatch('logOut')
    }
  },
  computed:{
    isAuth() {
      return this.$store.getters.getAuth
    },
    name() {
      return this.$store.getters.getName
    }
  }

}
</script>
