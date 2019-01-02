<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3>{{user.username}}</h3>
            <div>{{user.email}}</div>
          </div>
        </v-card-title>

        <v-card-text>
          <v-switch :label="theme"
            v-model="test"
            ></v-switch>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      test: false
    }
  },

  computed: {
    ...mapGetters({
      user: 'auth/user',
      isDark: 'user/isDarkTheme'
    }),

    theme () {
      this.test = !this.isDark
      this.toggleTheme()
      return this.test ? 'Dark' : 'Light'
    }
  },

  methods: {
    ...mapActions({
      toggleTheme: 'user/changeTheme'
    })
  }
}
</script>

