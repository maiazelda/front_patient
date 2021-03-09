<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-progress-circular size="96" width="7" color="secondary" indeterminate />
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: 'LoginCallback',
  mounted () {
    this.$store.dispatch('auth/loginCallback')
      .then(() => {
        this.$router.push({ name: 'Home' })
      })
  }
}
</script>