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
import { mapMutations } from 'vuex'
export default {
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
  },
  methods: {
    ...mapMutations({
      setCurrentNuchainAccountBalance: 'nuchain/setCurrentAccountBalance'
    }),
    async fetchBalance() {
      if (!this.account || !this.account.address) {
        return '-'
      }
      const { data } = await this.$nuchain.api.query.system.account(
        this.account.address
      )
      this.balance = this.$formatter.formatBalance(data.free)
      this.setCurrentNuchainAccountBalance(data)
    }
  }
}
</script>


<style lang="less">
.headline {
  font-family: 'RobotoSlab bold', Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: @brand-color-blue;
  line-height: 1em;
}
p {
  color: #6c7080;
  font-size: 1.7em;
  font-weight: bold;
}
</style>