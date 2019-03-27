<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn to="/classroom/create" color="success">Create Class</v-btn>
        </v-flex>
          <v-flex xs6 v-for="classroom in classrooms" :key="classroom._id">
            <v-hover>
              <v-card  slot-scope="{ hover }" color="blue-grey darken-2" :class="`elevation-${hover ? 12 : 2}`">
                <v-card-title primary-title>
                  <div>
                    <div class="headline white--text ">Subject: {{classroom.subject}}</div>
                    <span class="white--text ">Teacher: {{classroom.teacher.name}}</span>
                    <div class="white--text ">students: {{ classroom.students | countArray }}</div>
                    <div class="white--text ">start: {{ classroom.start | toLocalTime}}</div>
                    <div class="white--text ">end: {{ classroom.end | toLocalTime}}</div>
                    <div class="white--text ">day: {{ classroom.day}}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn outline flat dark @click="goEditClass(classroom._id)">EDIT</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
      <v-btn @click="test">test</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
// import http from '../api/http-common'
export default {
  data () {
    return {
      classrooms: [],
      testa: 'a'
    }
  },
  created () {
    
    this.$http.get('/class')
    .then(res => {
      this.classrooms = res.data
    })
    .catch(err => {
      })
  },
  methods: {
    test() {
      console.log(this.classrooms)
    },
    goEditClass(id) {
      this.$router.push({name: 'EditClassroom', params: { id: id}})
    }
  },
  filters: {
    countArray: function(value) {
      return value.length
    },
    toLocalTime: function(value) {
      const a = new Date(value)
      return a.toLocaleTimeString()
    }
  }
}
</script>
