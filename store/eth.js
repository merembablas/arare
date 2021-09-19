export const state = () => ({
  currentAccount: null,
  currentAccountBalance: 0
})

export const mutations = {
  setCurrentAccount(state, account) {
    state.currentAccount = account
  },
  setCurrentAccountBalance(state, balance) {
    state.currentAccountBalance = balance
  }
}
