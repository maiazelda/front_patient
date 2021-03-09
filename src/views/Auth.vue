<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-toolbar color="secondary" dark flat>
            <v-toolbar-title>Patient</v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large v-on="on" @click="onLoginClick">
                  <v-icon>mdi-account-circle</v-icon>
                </v-btn>
              </template>
              <span>Login</span>
            </v-tooltip>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Auth',
  methods: {
    onLoginClick () {
      this.$store.dispatch('auth/login')
        .then(() => {
          this.$router.push({ name: 'Home' })
        })
    }
  }
}
</script>
