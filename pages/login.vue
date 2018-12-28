<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>

          <v-text-field type="email"
            label="Email"
            v-model="email"></v-text-field>
          <v-text-field type="password"
            label="Passord"
            v-model="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/register">Register</v-btn>
          <v-btn
            color="primary"
            @click="login"
            flat>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Login',
    auth: false,
    data () {
      return {
        email: '',
        password: ''
      }
    },

    methods: {
      login () {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('auth/login', user)
          .then(res => {
            console.log('login success', res)
          })
          .catch(err => {
            console.error('error logging in', err)
          })
      }
    }
  }
</script>
