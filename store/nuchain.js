export const state = () => ({
  currentAccount: null,
  currentAccountBalance: null,
  hasBalance: false
})

export const mutations = {
  setCurrentAccount(state, account) {
    state.currentAccount = account
  },
  setCurrentAccountBalance(state, balance) {
    state.currentAccountBalance = balance
    if (balance == null) {
      state.hasBalance = false
      return
    }
    state.hasBalance = balance.free > 0.9
    console.log(
      '🚀 ~ file: nuchain.js ~ line 14 ~ setCurrentAccountBalance ~ balance.free',
      balance.free
    )
  }
}
