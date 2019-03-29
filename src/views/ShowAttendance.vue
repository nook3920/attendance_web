<template>
  <div>
    <el-table
      :data="attenlist"
      stripe
      style="width: 100%"
      :row-class-name="tableRowClassName"
      >
    <el-table-column
      prop="date"
      label="time"
      width="200"></el-table-column>
      
    <el-table-column
      prop="name"
      label="name"
      width="200"></el-table-column>
    <el-table-column
      prop="status"
      label="attend status"
      width="200"></el-table-column>
    <el-table-column
      prop="subject"
      label="subject name"
      width="200"></el-table-column>

    </el-table>
  </div>
</template>

<script>

const attendStatus = { 1: 'ตรงเวลา', 2: 'สาย', 3: 'ขาด' }
export default {
  data () {
    return {
      attenlist: []
    }

  },
  methods: {
    getAttend() {
      this.$http.get('/attend')
      .then(res => {
        console.log(res)
        this.attenlist = res.data.map(re => {
          
          return {name: re.studentid.name || 'N/A',
          date: new Date(re.date).toLocaleString(),
          status: attendStatus[re.status],
          subject: re.classroomid.subject}
        })
        console.log(this.attenlist)
      })
      .catch(err => {
        console.log(err)
      })
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 == 1) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      }
    
  },
  created() {
    this.getAttend()
  }
}
</script>
<style>
  .el-table .warning-row {
    background: #bcabeb;
  }

  .el-table .success-row {
    background: #bbc5e9;
  }
</style>
