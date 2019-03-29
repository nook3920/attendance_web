<template>
  <v-toolbar 
    flat
    dense
    fixed
    absolute
    extended
    
    app
  >
    
    <v-toolbar-title>Attendance</v-toolbar-title>
    
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

    <template  v-slot:extension>
      <v-tabs align-with-title v-if="role == 'ADMIN'">
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab v-for="ll in admin" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs align-with-title v-if="role == 'TEACHER'">
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab v-for="ll in teacher" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs align-with-title v-if="role == 'STUDENT'">
        <v-tabs-slider color="blue"></v-tabs-slider>
        <v-tab v-for="ll in student" :key="ll.name" :to="ll.path">{{ll.name}}</v-tab>
      </v-tabs>
      <v-tabs align-with-title v-if="!isAuth">
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
        {name: 'HOME', path: '/', icon: 'home'},
        {name: 'STUDENT', path: '/', icon: 'home'},
        {name: 'Profile', path: '/', icon: 'home'},
        {name: 'สถานะการเข้าเรียน', path: '/', icon: 'home'},
        {name: 'สรุปการเข้าเรียน/วิชา', path: '/', icon: 'home'},
        {name: 'สรุปการเข้าเรียน/เทอม', path: '/', icon: 'home'}
      ],
      teacher: [
        {name: 'HOME', path: '/', icon: 'home'},
        {name: 'TEACHER', path: '/classrooms', icon: 'home'},
        
      ],
      admin: [
        {name: 'HOME', path: '/', icon: 'home'},
        {name: 'CLASSROOM', path: '/classrooms', icon: 'account_box'},
        {name: 'ATTEND', path: '/showattendance', icon: 'account_box'},
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
