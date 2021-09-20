<template>
  <div class="p-5 relative w-2/3">
    <h1>HOT NTFs!</h1>
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