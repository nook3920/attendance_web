<template>
  <v-container fill-height fluid justify-center>
    <el-upload
      :auto-upload="false"
      :show-file-list="false"
      action=""
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      :on-change="handleChange"
      >
      <el-button type="primary" >upload</el-button>
      <div slot="tip" class="el-upload__tip">upload student list</div>
    </el-upload>
    
    <!-- <el-button type="text" >Hello</el-button> -->
    
  </v-container>
</template>


<script>
import XLSX from 'xlsx'
export default {
  data () {
    return {
      stList: [1]
    }
  },
  methods: {
    handleChange(file, fileList) {
      var f = file.raw
      const st = []
      var reader = new FileReader()
      reader.onload = function(e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'array'})
        workbook.Strings.forEach(ss => {
          st.push(ss.h.replace('-',''))
          // this.stList.push(ss.h)
          // console.log(ss.h)
        })
      }
      this.stList= st
      reader.readAsArrayBuffer(f)
      console.log(this.stList)
    }
  }
}
</script>
