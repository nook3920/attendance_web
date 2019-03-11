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
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark>Listen now</v-btn>
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
      console.log(res.data)
    })
    .catch(err => {
    })
  },
  methods: {
    test() {
      console.log(this.classrooms)
    }
  },
  filters: {
    countArray: function(value) {
      return value.length
    }
  }
}
</script>
