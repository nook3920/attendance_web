<template>
  <v-container  fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-layout align-center  row wrap>
        <v-flex xs12>
          <v-btn to="/classroom/create" color="green accent-4">สร้างห้องเรียน<v-icon right>playlist_add</v-icon></v-btn>
        </v-flex>
        <!-- <v-flex xs12><v-subheader dark>Class</v-subheader></v-flex> -->
          <v-flex xs4 v-for="classroom in classrooms" :key="classroom._id" >
            <v-hover >
              <v-card  dark slot-scope="{ hover }" color="#718792" :class="`elevation-${hover ? 12 : 2} justify-center ml-5` " width="80%" @click="goEditClass(classroom._id)">
                <v-card-title primary-title class="blue lighten-2">
                  <div>
                    <div class="headline font-weight-black ">{{classroom.subject}}</div>
                  </div>
                </v-card-title>
                <v-card-text class="subheading">
                    <span >Teacher: {{classroom.teacher.name}}</span>
                    <div >students: {{ classroom.students | countArray }}</div>
                    <div >start: {{ classroom.start | toLocalTime}}</div>
                    <div >end: {{ classroom.end | toLocalTime}}</div>
                    <div >day: {{ classroom.day}}</div>
                </v-card-text>
                <v-card-actions>
                  <!-- <v-btn color="cyan lighten-2"  @click="goEditClass(classroom._id)">แก้ไข<v-icon right>build</v-icon></v-btn> -->
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
