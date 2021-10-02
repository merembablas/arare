<template>
  <div>
    <Navbar />
    <div v-if="loaded" class="flex">
      <Nuxt />
    </div>

    <div
      v-if="!loaded"
      class="flex flex-col h-screen items-center pt-10 justify-top"
    >
      <client-only>
        <LoadingBig />
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
  mounted() {
    this.loaded = true
  }
}
</script>

<style lang="less" scoped>
</style>