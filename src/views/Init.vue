<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-progress-circular v-if="loadingFromStorage"
        size="96"
        width="7"
        color="secondary"
        indeterminate />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Init',
  props: {
    to: {
      type: Object,
      required: false
    }
  },
  computed: mapState({
    loadingFromStorage: state => state.auth.status === 'loading' || state.auth.status === ''
  }),
  mounted () {
    this.$store.dispatch('auth/initFromStorage')
      .then(logged => {
        if (logged) {
          if (this.to && this.to.name !== 'Init') this.$router.push(this.to)
          else this.$router.push({ name: 'Home' })
        }
        else this.$router.push({ name: 'Auth' })
      })
      .catch(() => {
        this.$router.push({ name: 'Auth' })
      })
  }
}
</script>