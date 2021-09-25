<template>
  <div class="p-5 relative w-full md:w-2/3">
    <!-- FEATURED -->
    <div class="flex flex-col">
      <div class="p-5 rounded-xl w-full h-64 bg-blue-100">
        <h2>Featured</h2>
      </div>

      <div class="p-5 rounded-xl w-full h-64 bg-yellow-100 mt-5">
        <h2>Hot</h2>
      </div>

      <div class="p-5 rounded-xl w-full h-64 bg-green-100 mt-5">
        <h2>Latest</h2>
      </div>
    </div>
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  layout: 'explorer',
  data() {
    return {
      balance: '-',
      creators: this.$dummy.generateUsers(5)
    }
  },
  // computed: {
  // account() {
  //   return this.$store.state.nuchain.currentAccount
  // }
  // },
  watch: {
    '$store.state.nuchain.currentAccount'(account) {
      this.fetchBalance()
    },
    '$store.state.eth.currentAccount'(account) {
      this.fetchBalance()
    }
  },
  async mounted() {
    await this.fetchBalance()
  }
}
</script>


<style lang="less" scoped>
p {
  color: #6c7080;
}
</style>