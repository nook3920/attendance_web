<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-card class="mx-auto" color="blue lighten-3" dark width="75%">
        <v-card-title class="black--text">
          <span class="title font-weight-black text-uppercase">{{classroom.subject}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
          <p>Teacher: {{ classroom.teacher.name}}</p>
          <p>Start: {{classroom.start | toLocalTime}} End: {{ classroom.end | toLocalTime }} Late: {{classroom.late}} min</p>
          <p>Day: {{ classroom.day }}</p>
          <v-expansion-panel>
            <v-expansion-panel-content class="blue lighten-4">
              <template v-slot:header>
                <div class="blue-grey--text">รายชื่อนักศึกษา</div>
              </template>
              <el-table
                :data="classroom.students"
                border
                max-height="250"
                >
                <el-table-column
                  prop='user_id'
                  label="รหัส นศ."
                  >
                </el-table-column>
                <el-table-column
                  prop='name'
                  label="ชื่อ"
                  >
                </el-table-column>
              </el-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>

        <v-card-actions>
          <v-list-tile class="grow">
            <v-layout align-center justify-start>
              <span>total {{classroom.students | countArray}}</span>
            </v-layout>
          </v-list-tile>
          <el-button type="danger" icon="el-icon-delete" circle @click="delClass"></el-button>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      classId: this.$route.params.id,
      classroom: {}
    };
  },
  methods: {
    getClassroom() {
      this.$http
        .get(`/class/${this.classId}`)
        .then(res => {
          console.log(res.data);
          this.classroom = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delClass(){
      this.$confirm('delete class?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        // console.log('OK!!!', this.classroom._id)
        this.$http.delete(`/class/${this.classroom._id}`)
        .then(res => {
          console.log(res.data)
          this.$router.push({name: 'Classrooms'})
        })
        .catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log('cancel!!!')
      })
    }
  },
  created() {
    this.getClassroom();
  },
  filters: {
    toLocalTime: function(value) {
      const a = new Date(value);
      return a.toLocaleTimeString();
    },
    countArray: function(value) {
      return value.length;
    }
  }


};
</script>