export const state = () => ({
  currentAccount: null
})

export const mutations = {
  setCurrentAccount(state, account) {
    state.currentAccount = account
  }
}
