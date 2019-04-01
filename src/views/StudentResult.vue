<template>
  <v-container fluid grid-list-ls>
    <v-layout row wrap>
      <v-flex xs12>

      <el-table
      :data="classResult"
      stripe
      style="width: 50%"
      >
      <el-table-column sortable prop="_id" label="รายวิชา"></el-table-column>
      <el-table-column sortable width="120" prop="countA" label="ตรงเวลา"></el-table-column>
      <el-table-column sortable width="120" prop="countB" label="สาย"></el-table-column>
      <el-table-column sortable width="120" prop="countC" label="ขาด"></el-table-column>
      </el-table>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      classResult: []
    }
  },
  methods: {
    getClassRes(){
      this.$http.get('/studentresult')
      .then(res => {
        this.classResult = res.data
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getClassRes()
  }
}
</script>
