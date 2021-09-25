import { mapGetters, mapMutations } from 'vuex'
import { BigNumber } from 'bignumber.js'

export default {
    computed: {
        account() {
            return (
                this.$store.state.eth.currentAccount ||
                this.$store.state.nuchain.currentAccount
            )
        },
        connected() {
            return this.account !== null
        },
        accountAddress() {
            if (!this.account) {
                return '???'
            }
            if (this.account.address) {
                return this.account.address
            }
            return this.account
        },
        isNuchain() {
            return this.account && this.account.meta && this.account.address
        },
        isMetamask() {
            return !this.isNuchain
        }
    },
    methods: {
        ...mapGetters('user', ['getCurrentIdentity']),
        ...mapMutations({
            setCurrentNuchainAccountBalance: 'nuchain/setCurrentAccountBalance',
            setCurrentEthAccountBalance: 'eth/setCurrentAccountBalance'
        }),
        async fetchBalance() {
            if (!this.account) {
                return '-'
            }
            if (this.account.address) {
                // Nuchain
                const { data } = await this.$nuchain.api.query.system.account(
                    this.account.address
                )
                this.balance = this.$formatter.formatBalance(
                    new BigNumber(data.free.toHex(), 16),
                    'nuchain'
                )
                this.setCurrentNuchainAccountBalance(data)
            } else {
                // ETH
                // fetch account's balance
                const bal = await window.ethereum.request({
                    method: 'eth_getBalance',
                    params: [this.account, 'latest']
                })
                let decodedBal = new BigNumber(bal, 16)
                decodedBal = decodedBal.dividedBy(new BigNumber(10).pow(18))
                // console.log(
                //   '🚀 ~ file: Connect.vue ~ line 123 ~ connectMetamask ~ bal',
                //   decodedBal.toString(10)
                // )
                this.balance = this.$formatter.formatBalance(decodedBal, 'ethereum')
                this.setCurrentEthAccountBalance(this.balance)
            }
        },
        logout() {
            this.setCurrentNuchainAccountBalance(null)
        }
    }
}
