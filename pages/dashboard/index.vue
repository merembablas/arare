<template>
  <div class="p-2 md:p-10 w-full md:w-2/3 h-full">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
      <DashboardStatItem name="Balance" :value="balance" />
      <DashboardStatItem name="Collections" value="5" />
      <DashboardStatItem name="Created" :value="createdCount" />
      <DashboardStatItem name="Owned" :value="ownedCount" />
    </div>

    <DashboardTransactionTable :transactions="transactions" />
    <DashboardTopItemsTable :items="topItems" />
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  layout: 'dashboard',
  data() {
    return {
      balance: '-',
      ownedCount: '0',
      createdCount: '0',
      transactions: [],
      topItems: []
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
    await this.fetchStats()
  },
  methods: {
    async fetchStats() {
      const {
        data: { error, result }
      } = await this.$axios.get('/api/stats')
      if (error) {
        alert(error)
        return
      }
      this.ownedCount = result.ownedCount.toString()
      this.createdCount = result.createdCount.toString()
      this.transactions = result.transactions
      this.topItems = result.topItems
    }
  }
}
</script>


<style lang="less" scoped>
p {
  color: #6c7080;
}
</style>