<template>
  <div>
    <Navbar />
    <div class="flex">
      <DashboardSidebar class="w-auto md:w-64" />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  watch: {
    // watch for currentAccount
    // if logout then check for path
    // if in dashboard then redirect to front page
    '$store.state.eth.currentAccount'() {
      // console.log(this.$route.path)
      if (this.$route.path.startsWith('/dashboard')) {
        this.$router.replace('/')
      }
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