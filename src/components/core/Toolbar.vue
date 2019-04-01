<template>
  <v-toolbar  
    flat
    dense
    fixed
    absolute
    extended 
    color="primary"
    class="elevation-3"
    dark
    app
  >
    <img src="../../assets/cam.png" alt="Logo" style="height:70px; width:100px; transform: rotate(340deg)">
    <v-toolbar-title>ระบบเช็คชื่อโดยการจดจำใบหน้า</v-toolbar-title>
    
    <v-spacer></v-spacer>
    
    <v-toolbar-items  v-if="!isAuth">
      <v-btn to="/login" flat>login</v-btn>
      <v-divider></v-divider>
      <v-btn  flat to="/register">signup</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else>
      <v-btn flat to="/profile"><v-icon large color="light-green accent-3">person</v-icon>  {{ name }}</v-btn>
      <v-divider></v-divider>
      <v-btn @click="logOut"  flat>logout</v-btn>
    </v-toolbar-items>

    <template   v-slot:extension >
      <v-tabs  color="rgb(255,255,255,0)" align-with-title v-if="role == 'ADMIN'">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="ll in admin" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs color="rgb(255,255,255,0)" align-with-title v-if="role == 'TEACHER'">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="ll in teacher" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs color="rgb(255,255,255,0)" align-with-title v-if="role == 'STUDENT'">
        <v-tabs-slider color="white"></v-tabs-slider>
        <v-tab v-for="ll in student" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs color="rgb(255,255,255,0)" align-with-title v-if="!isAuth" >
        <v-tab to="/">HOME</v-tab>
      </v-tabs>
    </template>

  </v-toolbar>
</template>

<script>
export default {
  name: 'Toolbar',
  data () {
    return {
      userId: '',
      password: '',
      isSignIn: false,
      student: [
        {name: 'หน้าแรก', path: '/', icon: 'home'},
        {name: 'สรุปการเข้าเรียน/เทอม', path: '/student', icon: 'home'}
      ],
      teacher: [
        {name: 'หน้าแรก', path: '/', icon: 'home'},
        {name: 'ห้องเรียน', path: '/classrooms', icon: 'account_box'},
        {name: 'TEACHER', path: '/classrooms', icon: 'home'},
        
      ],
      admin: [
        {name: 'หน้าแรก', path: '/', icon: 'home'},
        {name: 'ห้องเรียน', path: '/classrooms', icon: 'account_box'},
        {name: 'แดชบอร์ด', path: '/dashboard', icon: 'account_box'},
      ]
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
    },
    role () {
      return this.$store.getters.getRole
    }
  }

}
</script>
