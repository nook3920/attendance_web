<template>
  <div>
    <el-upload
      :action="uploadHost"
      :file-list="fileList"
      list-type="picture-card"
      :on-change="handleChange"
      :auto-upload="false"
      :on-success="getPicture"
      :on-remove="handleRemove"
      accept="image/jpeg"
      name="photo"
      >
    <el-button size="small" type="primary">Click to upload</el-button>
    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
  </div>
</template>

<script>
import http from '../api/http-common'
export default {
  name: 'excel',
  data () {
    return {
      picData: '',
      uploadHost: `${location.hostname}:3000/user/picture`,
      fileList: []
    }
  },
  methods: {
    handleChange (file, fileList) {
      console.log(file)
      
      var reader = new FileReader()
      reader.onload = function(e) {
        this.picData = e.target.result
        // console.log(this.picData)
        http.post('/user/picture', {
          pic: this.picData
        }).then(res => {
          // console.log(res)
          fileList.splice(-1,1)
          fileList.push({uid: file.uid, name: res.data.fileName, url: `http://${location.hostname}:3000/datasets/${res.data.id}/${res.data.fileName}`})
          // console.log(this.fileList)
        }).catch(err => {
          console.log(err)
        })
      }

      reader.readAsDataURL(file.raw)

    },
    getPicture() {
      this.fileList = []
      let id = this.$store.getters.getUser.user_id
      http.get('/user/picture')
      .then(res => {
        res.data.picture.forEach(aa => {
          this.fileList.push({name: aa, url: `http://${location.hostname}:3000/datasets/${res.data.id}/${aa}`})

        }) 
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleRemove(file, fileList) {
      console.log(file)
      http.delete('/user/picture',
       {data: {
        filename: file.name
      }})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getPicture()
  }
}
</script>
