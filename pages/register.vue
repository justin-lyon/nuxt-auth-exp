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

          <v-text-field type="text"
            label="User Name"
            v-model="username"></v-text-field>
          <v-text-field type="email"
            label="Email"
            v-model="email"></v-text-field>
          <v-text-field type="password"
            label="Passord"
            v-model="password"></v-text-field>
          <v-text-field type="password"
            label="Passord"
            v-model="confirmPassword"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="primary"
            @click="register"
            flat>Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Login',
    auth: false,
    data () {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    methods: {
      register () {
        if(this.password !== this.confirmPassword) {
          console.error('password do not match.')
          return
        }
        const user = {
          username: this.username,
          email: this.email,
          password: this.password
        }

        this.$store.dispatch('auth/register', user)
          .then(res => {
            console.log('register.vue', res)
          })
          .catch(err => {
            console.error('Error creating user.', err)
          })
      }
    }
  }
</script>
