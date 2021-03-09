<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-progress-circular size="96" width="7" color="secondary" indeterminate />
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'LogoutCallback',
  mounted () {
    this.$store.dispatch('auth/logoutCallback')
      .then(() => {
        this.$router.push({ name: 'Home' })
      })
  }
}
</script>