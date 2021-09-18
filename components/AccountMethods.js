import { mapMutations } from 'vuex'
export default {
  computed: {
    account() {
      return (
        this.$store.state.eth.currentAccount ||
        this.$store.state.nuchain.currentAccount
      )
    },
    isNuchain() {
      return this.account && this.account.meta && this.account.address
    },
    isMetamask() {
      return !this.isNuchain
    }
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
    },
    logout() {
      this.setCurrentNuchainAccountBalance(null)
    }
  }
}
