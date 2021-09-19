<template>
  <div>
    <Navbar />
    <div v-if="loaded" class="flex">
      <DashboardSidebar v-if="hasBalance" class="w-auto md:w-64" />
      <Nuxt v-if="hasBalance" />
    </div>

    <div class="flex flex-col h-screen items-center pt-10 justify-top">
      <client-only>
        <div
          v-if="loaded && !hasBalance"
          class="bg-yellow-200 rounded-xl p-10 w-2/3 h-42"
        >
          Account not exists, for nuchain account you need at least 1 ARA
          (existential deposit).
        </div>
      </client-only>
    </div>

    <Footer />
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    hasBalance() {
      if (this.isNuchain) {
        return this.$store.state.nuchain.hasBalance
      }
      if (this.isMetamask) {
        return true
      }
      return false
    }
  },
  watch: {
    // watch for currentAccount
    // if logout then check for path
    // if in dashboard then redirect to front page
    '$store.state.eth.currentAccount'(account) {
      if (!account) {
        this.getOutDashboard()
      }
    },
    '$store.state.nuchain.currentAccount'(account) {
      console.log('incurrentAccount:', account)
      if (!account) {
        this.getOutDashboard()
        this.logout()
      } else {
        this.fetchBalance()
      }
    }
  },
  mounted() {
    this.fetchBalance()
    setTimeout(() => (this.loaded = true), 300)
  },
  methods: {
    getOutDashboard() {
      if (this.$route.path.startsWith('/dashboard')) {
        this.$router.replace('/')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less">
h2 {
  color: @brand-color-blue;
  font-size: 1.2em;
}
</style>