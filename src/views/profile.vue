<template>
  <v-container  fluid grid-list-xl class="white--text">
    <v-layout justify-center wrap>
      <v-card max-width="35%" >
        <v-card-title class="white--text blue lighten-2 justify-center" >
            <h1 class="font-weight-black ">โปรไฟล์ส่วนตัว</h1>
        </v-card-title>
          
        <v-container py-5>
          <v-layout row wrap justify-center>
            <v-flex xs3>
              <v-avatar   :tile="false" size="150" color="grey lighten-4">
                <img ref="avatar" :src="avatar" alt="avatar">
              </v-avatar>
            </v-flex>
              <image-uploader
                :preview="false"
                className="fileInput"
                id="fileInput"
                class="[fileInput]"
                capture="environment"
                :debug="1"
                doNotResize="gif"
                :autoRotate="true"
                outputFormat="verbose"
                @input="setImage"
                ref="file"
              >
                <label for="fileInput" slot="upload-label">
                  <figure>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <path
                        class="path1"
                        d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                      ></path>
                    </svg>
                  </figure>
                  
                </label>
              </image-uploader>
            
            <v-flex xs12 >
              <v-text-field  label="รหัสนักศึกษา/เลขไอดี" :value="user.user_id" outline disabled></v-text-field>
            </v-flex>          
            <v-flex xs6>
              <v-text-field label="ชื่อ" :value="user.name" v-model="name" outline :disabled="!edit"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="อีเมล" :value="user.email" v-model="email" outline :disabled="!edit"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="เพศ" :value="user.gender" outline disabled></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="สถานะ" :value="user.role" outline disabled></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn v-if="edit" @click="editProfile"  color="info">SAVE</v-btn>
          <v-btn v-else @click="edit = !edit" color="info">EDIT</v-btn>
        </v-card-actions>
        <excel></excel>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import http from '../api/http-common'
import excel from './excel'
export default {
  components:{
    excel
  },
  data() {
    return {
      edit: false,
      file: null,
      image: "https://vuetifyjs.com/apple-touch-icon-180x180.png",
      hasImage: false,
      avatar: ``,
      name: this.$store.getters.getName,
      email: this.$store.getters.getEmail
      
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    setImage(output) {
      this.hasImage = true
      this.image = output
      this.image.name = this.user.user_id
      this.image._id = this.user._id
      http.post(`/user/avatar`, this.image)
      .then(res => {
        this.getAvatar()
        
        console.log('uploaded')
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getAvatar() {
      http.get('/user/avatar')
      .then(res => {
        this.avatar = res.data.a
      })
      .catch(err => {
        console.log(err)
      })
    },
    editProfile(){
      this.$http.post('/user/profile', { name: this.name, email: this.email })
      .then(res => {
        this.$store.commit('setName', { name: this.name})
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      this.edit = !this.edit
    }
  },
  created() {
    this.getAvatar()
  }
};
</script>

<style lang="css">
#fileInput {
  display: none !important;
}
.fileInput {
  display: none
}
</style>
