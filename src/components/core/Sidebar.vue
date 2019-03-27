<template>
  <v-navigation-drawer
    absolute
    fixed
    :value="drawer"
    width="225"
    permanent
    stateless
    app
  >
    <v-list v-if="role == 'ADMIN'">
      <v-list-tile v-for="ll in admin" :key="ll.name" @click="test" :to="ll.path">
        <v-list-tile-action>
          <v-icon>{{ll.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ll.name}}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list v-if="role == 'TEACHER'">
      <v-list-tile v-for="ll in teacher" :key="ll.name" @click="test" :to="ll.path">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ll.name}}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list v-if="role == 'STUDENT'">
      <v-list-tile v-for="ll in student" :key="ll.name" @click="test" :to="ll.path">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          {{ll.name}}
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list v-if="!auth">
      <v-list-tile @click="test" to="/">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>
          HOME
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'Sidebar',
  data () {
    return {
      drawer: true,
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
  methods: {
    test() {
      console.log(this.$store.getters.getRole)
    }
  },
  computed: {
    role () {
      return this.$store.getters.getRole
    },
    auth () {
      return this.$store.getters.getAuth
    }
  }
}
</script>
