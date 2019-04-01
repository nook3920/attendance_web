<template>
  <v-container fill-height fluid justify-center>
    <el-row type="flex" class="row-bg" justify="center">
      
        <el-form dark :model="form" :rules="rules" ref="ruleForm" label-width="80px">
          <el-form-item label="Subject" prop="subjectName">
            <el-col :span="24">
              <el-input v-model="form.subjectName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="roomId" prop="roomId">
            <el-col :span="24">
              <el-input v-model="form.roomId"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="ClassTime" prop="classTime">
            <el-col :span="16">
              <el-time-picker
                is-range
                arrow-control
                v-model="form.classTime"
                range-separator="To"
                start-placeholde="Start Time"
                end-placeholde="End Time"
                format="HH:mm"
              ></el-time-picker>
            </el-col>
            <el-form-item label="Late" prop="late">
              <el-col :span="4">
                <el-input v-model="form.late" placeholder="late time"></el-input>
              </el-col>
            </el-form-item>
          </el-form-item>
          <el-form-item label="ClassDay" prop="classDay">
            <el-col :span="24">
              <el-radio-group v-model="form.classDay" size="small">
                <el-radio-button v-for="d in days" :key="d.id" :label="d.name"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item>
            <p style="text-align: center; margin: 0 0 20px" class="white--text title">Add student to class</p>
            <el-transfer
              v-model="selectStudent"
              :data="studentList"
              :titles="['StudentList', 'ClassRoom']"
            ></el-transfer>
            <el-upload
              :auto-upload="false"
              :show-file-list="false"
              action
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              :on-change="handleChange"
            >
              <el-button type="primary">upload</el-button>
              <div slot="tip" class="el-upload__tip">upload student list</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="test">create</el-button>
            <el-button>Cancle</el-button>
          </el-form-item>
        </el-form>
     
    </el-row>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
import router from "../router";
export default {
  data() {
    return {
      form: {
        subjectName: "",
        roomId: "413",
        classTime: [new Date(), new Date()],
        classDay: "",
        late: 15,
        students: []
      },

      studentList: [],
      selectStudent: [],
      days: [
        { id: 0, name: "sunday" },
        { id: 1, name: "monday" },
        { id: 2, name: "tuesday" },
        { id: 3, name: "wednesday" },
        { id: 4, name: "thursday" },
        { id: 5, name: "friday" },
        { id: 6, name: "saturday" }
      ],
      rules: {
        subjectName: [
          {
            required: true,
            message: "Please input Subject Name",
            trigger: "blur"
          }
        ],
        roomId: [
          {
            required: true,
            message: "Please input Room ID",
            trigger: "blur"
          }
        ],
        classTime: [
          {
            required: true,
            message: "Please select Class Time",
            trigger: "blur"
          }
        ],
        classDay: [
          {
            required: true,
            message: "Please select Class Day",
            trigger: "blur"
          }
        ],
        late: [
          { required: true, message: "Please input late time", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getStudent() {
      this.$http
        .get("/class/student")
        .then(res => {
          if (res.data.length) {
            this.studentList = res.data.map((student, i) => {
              return {
                key: i + 1,
                label: student.name,
                disabled: false,
                _id: student._id,
                user_id: student.user_id
              };
            });
          }
          console.log(this.studentList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    test() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("/class", this.form)
            .then(res => {
              console.log(res);
              this.$message({
                message: "classroom created",
                type: "success"
              });
              router.push({ path: "/classroom" });
            })
            .catch(err => {
              console.log(err.response);
            });
          console.log(this.form);
        } else {
          console.log("form error");
          return false;
        }
      });
    },
    handleChange(file, fileList) {
      const a = this.studentList;
      var f = file.raw;
      const st = [];
      let slSt = [];
      var reader = new FileReader();
      reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: "array" });
        workbook.Strings.forEach(ss => {
          a.map((c, i) => {
            if (ss.h.replace("-", "") == c.user_id) slSt.push(i + 1);
          });
        });
      };
      reader.readAsArrayBuffer(f);
      this.selectStudent = slSt;
    }
  },
  watch: {
    selectStudent: function() {
      this.form.students = this.selectStudent.map(i => {
        return this.studentList[i - 1]._id;
      });
    }
  },
  created() {
    this.getStudent();
  }
};
</script>

<style>
.el-form-item__label , .el-upload__tip {
  color: white;
}
</style>
