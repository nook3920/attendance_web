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
      <v-card>
        <v-card>
          HEADER
        </v-card>
        <form>
          <v-container py-0>
            <v-layout wrap>
              <v-flex xs12 md12>
                <v-text-field
                  label="User ID"
                  v-model="user_id"
                  v-validate="'required'"
                  data-vv-name="user_id"
                  :error-messages="errors.collect('user_id')"
                />
              </v-flex>
              <v-flex xs12 md12>
                <v-text-field
                  label="password"
                  v-model="password"
                  type="password"
                  v-validate="'required|min:6'"
                  data-vv-name="password"
                  :error-messages="errors.collect('password')"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </form>
        <v-card-actions>
           <v-btn @click="signIn" color="success">login</v-btn>  
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
