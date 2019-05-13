<template>
  <v-container fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-card class="mx-auto elevation-5" color="#718792" dark width="75%">
        <v-card-title class="white--text blue lighten-2">
          <span class="title font-weight-black text-uppercase">{{classroom.subject}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
          <p>อาจารย์ : {{ classroom.teacher.name}}</p>
          <p>เริ่ม : {{classroom.start | toLocalTime}} สิ้นสุด : {{ classroom.end | toLocalTime }} สายได้ : {{classroom.late}} นาที</p>
          <p>วัน : {{ classroom.day }}</p>
          <v-expansion-panel>
            <v-expansion-panel-content class="blue-grey lighten-2">
              <template v-slot:header>
                <div class="white--text">สรุปการเข้าเรียนรายเทอม</div>
              </template>
              <el-table :data="classResult" border max-height="250">
                <el-table-column sortable prop="_id.user_id" label="รหัส นศ."></el-table-column>
                <el-table-column sortable prop="_id.name" label="ชื่อ"></el-table-column>
                <el-table-column sortable width="80"  prop="countA" label="ตรงเวลา"></el-table-column>
                <el-table-column sortable width="80"  prop="countB" label="สาย"></el-table-column>
                <el-table-column sortable width="80"  prop="countC" label="ขาด"></el-table-column>
              </el-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
        
        <v-card-actions>
          <v-list-tile class="grow">
            <v-layout align-center justify-start>
              <span>นักศึกษาทั้งหมด {{classroom.students | countArray}} คน</span>
            </v-layout>
          </v-list-tile>
          <el-button type="danger" icon="el-icon-delete" circle @click="delClass"></el-button>
        </v-card-actions>

        <h1>รายชื่อการเข้าเรียนแต่ละสัปดาห์</h1>

        <v-expansion-panel v-for="at in allAttend" :key="at._id">
          <v-expansion-panel-content class="amber accent-4" ripple>
            <template v-slot:header>
              <div class="black--text">{{ at._id }}</div>
            </template>
            <el-table :data="at.students" border max-height="250" :row-class-name="tableRowClassName" @row-click="handleClick">
              
              <el-table-column prop="name" label="ชื่อ"></el-table-column>
              <el-table-column label="สถานะเข้าเรียน">
                <template slot-scope="scope">
                  
                  <span style="margin-left: 10px">{{ scope.row.status | attendStatus}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="time" label="เวลาเข้าเรียน"></el-table-column>
              <!-- <el-table-column label="picture">
                <template slot-scope="scope">
                  <v-img
                    :src="`http://${baseHost}:3000${scope.row.picture}`"
                    height="125"
                    >

                  </v-img>
                </template>
              </el-table-column> -->
              <el-table-column
                label="แก้ไขสถานะ">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleOne(scope.$index, scope.row)">ตรงเวลา</el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    @click="handleTwo(scope.$index, scope.row)">สาย</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleThree(scope.$index, scope.row)">ขาด</el-button>
                  <el-popover placement="top-start" title="picture" width="200" trigger="hover">
                    <v-img
                    :src="`http://${baseHost}:3000${scope.row.picture}`"
                    height="125"
                    >
                  </v-img>
                  <el-button size="mini" type="primary" slot="reference">รูป</el-button>
                  </el-popover>
                </template>
              </el-table-column>
             
            </el-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      classId: this.$route.params.id,
      baseHost: location.hostname,
      classroom: {},
      allAttend: [],
      classResult: []
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }){
      
      if(row.status === 1){
        return 'green-row'
      }else if( row.status === 2){
        return 'yellow-row'
      }else if( row.status === 3){
        return 'red-row'
      }
      return ''
    },
    getClassroom() {
      this.$http
        .get(`/class/${this.classId}`)
        .then(res => {
          // console.log(res.data);
          this.classroom = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delClass() {
      this.$confirm("delete class?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          // console.log('OK!!!', this.classroom._id)
          this.$http
            .delete(`/class/${this.classroom._id}`)
            .then(res => {
              // console.log(res.data)
              this.$router.push({ name: "Classrooms" });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log("cancel!!!");
        });
    },
    getAttendByClass() {
      console.log(this.classId)
      this.$http
        .post("/att", { classid: this.classId})
        .then(res => {
          console.log(res.data);
          this.allAttend = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getClassResult() {
      this.$http.post('/attendresult', { classid: this.classId})
      .then(res => {
        this.classResult = res.data
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleOne(index, row){
      this.$http.post('/changeatt',{ id: row._id, status: 1})
      .then(res => {
        row.status = 1
        console.log('ok')
      }).catch(err => {
        console.log(err)
      })
    },
    handleTwo(index, row){
      this.$http.post('/changeatt',{ id: row._id, status: 2})
      .then(res => {
        row.status = 2
        console.log('ok')
      }).catch(err => {
        console.log(err)
      })
    },
    handleThree(index, row){
      this.$http.post('/changeatt',{ id: row._id, status: 3})
      .then(res => {
        row.status = 3
        console.log('ok')
      }).catch(err => {
        console.log(err)
      })
    },
    handleClick(val){
      console.log(val)

    }
  },
  created() {
    this.getClassroom();
    this.getAttendByClass();
    this.getClassResult()
  },
  filters: {
    toLocalTime: function(value) {
      const a = new Date(value);
      return a.toLocaleTimeString();
    },
    countArray: function(value) {
      return value.length;
    },
    attendStatus: function(value) {
      const attendStatus = { 1: "ตรงเวลา", 2: "สาย", 3: "ขาด" };
      return attendStatus[value];
    }
  }
};
</script>

<style>
  .el-table .green-row {
    background: #69F0AE;
  }

  .el-table .yellow-row {
    background: #FFFF00;
  }

  .el-table .red-row {
    background: #EF5350;
  }
</style>