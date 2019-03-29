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
    
      <v-card max-width="50%">
        <v-sheet color="elevation-5 green lighten-5" class="px-2 mx-2" >
          <v-layout justify-center >
            <h1 class="font-weight-black">Register</h1>
          </v-layout>
        </v-sheet>
      <v-form>
        <v-container py-5>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                class="input-name"
                label="User ID"
                v-model="user_id"
                v-validate="'required'"
                data-vv-name="user_id"
                :error-messages="errors.collect('user_id')"
                outline
              >
              </v-text-field>
            </v-flex>  
              <v-flex xs12>
                
              <v-text-field
                label="password"
                v-model="password"
                v-validate="'required|min:6'"
                data-vv-name="password"
                :error-messages="errors.collect('password')"
                outline
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="name"
                v-model="name"
                v-validate="'required'"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                outline
            
              >
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="email"
                v-model="email"
                v-validate="'required|email'"
                data-vv-name="email"
                :error-messages="errors.collect('email')"
                outline
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="genderList"
                v-model="gender"
                label="gender"
                outline
                v-validate="'required'"
                :error-messages="errors.collect('gender')"
                data-vv-name="gender"
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                :items="roleList"
                v-model="role"
                label="role"
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
        <v-btn @click="signUp" color="success">SignUp</v-btn>
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
      user_id: '',
      password: '',
      email: '',
      name: '',
      role: '',
      gender: '',
      genderList: [
        'Male',
        'Female'
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

<style>
.input-name {
  
}
</style>
