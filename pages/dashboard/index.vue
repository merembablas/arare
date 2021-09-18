<template>
  <div class="p-10 w-2/3 h-full">
    <div class="grid grid-cols-3 gap-4 h-full">
      <DashboardStatItem name="Balance" :value="balance" />
      <DashboardStatItem name="Collections" value="5" />
      <DashboardStatItem name="Items" value="100 ARA" />
    </div>

    <DashboardTransactionTable />
    <DashboardTopItemsTable />
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
      creators: this.$dummy.generateUsers(5)
    }
  },
  computed: {
    account() {
      return this.$store.state.nuchain.currentAccount
    }
  },
  watch: {
    '$store.state.nuchain.currentAccount'(account) {
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