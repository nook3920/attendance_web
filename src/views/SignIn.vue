<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
    >
    <v-layout
      justify-center
      wrap
    >
      <v-card max-width="30%" max-height="30%">
        <v-sheet color="elevation-5 green lighten-5" class="px- mx-2" >
          <v-layout justify-center >
            <h1 class="font-weight-black">เข้าสู่ระบบ</h1>
          </v-layout>
        </v-sheet>
        <!-- <v-card>
          เข้าสู่ระบบ
        </v-card> -->
        <form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-text-field
                  label="รหัสนักศึกษา/เลขไอดี"
                  v-model="user_id"
                  v-validate="'required'"
                  data-vv-name="user_id"
                  :error-messages="errors.collect('user_id')"
                />
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field
                  label="รหัสผ่าน"
                  v-model="password"
                  type="password"
                  v-validate="'required|min:6'"
                  data-vv-name="password"
                  :error-messages="errors.collect('password')"
                  @keyup.enter="signIn"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </form>
        <v-card-actions class="justify-center">
           <v-btn @click="signIn"  color="success" >ล็อคอิน</v-btn>  
        </v-card-actions>
      </v-card>
  </v-layout>
  </v-container>
</template>

<script>
export default {
  $_veeValidate: {
      validator: 'new'
  },
  data () {
    return {
      user_id: '',
      password: '',
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
  methods: {
    signIn () {
      this.$validator.validateAll()
      .then(result => {
        this.$store.dispatch('signIn', {
          user_id: this.user_id,
          password: this.password
        })
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  created () {
    this.$store.dispatch('logOut')
  }
}
</script>
