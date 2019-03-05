<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-layout row wrap>
          <v-flex xs6 v-for="classroom in classrooms" :key="classroom._id">
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{classroom.subject}}</div>
                  <span>{{classroom.teacher.name}}</span>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark>Listen now</v-btn>
              </v-card-actions>
            </v-card>
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
      test: 'a'
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
    }
  }
}
</script>
