<template>
  <v-container
  
    fluid
    
    >
    <v-layout
      justify-center
      wrap
    >
      <v-card max-width="30%" max-height="100%">
        <v-card-title class="white--text blue lighten-2 pa-0 justify-center">
          <h1 class="font-weight-black">สมัครสมาชิก</h1>
        </v-card-title>
      <v-form>
        <v-container >
          <v-layout wrap>
            <v-flex xs12 class="pa-0">
              <v-text-field
                class="input-name"
                label="รหัสนักศึกษา(ไม่มีขีด)/เลขไอดี(อาจารย์)"
                v-model="user_id"
                v-validate="'required'"
                data-vv-name="user_id"
                :error-messages="errors.collect('user_id')"
                outline
                
              >
              </v-text-field>
            </v-flex >  
              <v-flex xs12 class="pa-0">
              <v-text-field
                label="รหัสผ่าน"
                v-model="password"
                v-validate="'required|min:6'"
                data-vv-name="password"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :error-messages="errors.collect('password')"
                outline
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="pa-0">
              <v-text-field
                label="ชื่อ-นามสกุล"
                v-model="name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                outline
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12 class="pa-0">
              <v-text-field
                label="อีเมล"
                v-model="email"
                v-validate="'required|email'"
                data-vv-name="email"
                :error-messages="errors.collect('email')"
                outline
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="pa-0">
              <v-select
                :items="genderList"
                v-model="gender"
                label="เพศ"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('gender')"
                data-vv-name="gender"
                
              ></v-select>
            </v-flex>
            <v-flex xs6 class="pa-0">
              <v-select
                :items="roleList"
                v-model="role"
                label="สถานะ"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('role')"
                data-vv-name="role"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-card-actions class="justify-center">
        <v-btn @click="signUp" color="success">ยืนยัน</v-btn>
        <!-- <v-btn @click="test" color="success">test emit</v-btn> -->
      </v-card-actions>
    </v-card>
    </v-layout>
  </v-container>


</template>
<script>
import EventBus from '../eventBus'
export default {
  data () {
    return {
      show: false,
      user_id: '',
      password: '',
      email: '',
      name: '',
      role: '',
      gender: '',
      genderList: [
        'MALE',
        'FEMALE'
      ],
      roleList: [
        'STUDENT',
        'TEACHER'
      ],
      dictionary: {
        attributes: {
          user_id: 'USER_ID'
        },
        custom: {
          user_id: {
            required: () => 'User Id is required'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    signUp() {
      this.$validator.validateAll()
      .then(result => {
        this.$store.dispatch('signUp', {
          user_id: this.user_id,
          email: this.email,
          name: this.name,
          gender: this.gender,
          password: this.password,
          role: this.role
        })
      })
    },
    test() {
      this.$store.dispatch('noti', {
        message: 'test',
        color: 'error'
      })
    }
  }

}
</script>


