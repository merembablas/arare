export const state = () => ({
  identity: null
})

export const getters = {
  getCurrentIdentity(state) {
    return state.identity
  }
}

export const mutations = {
  setIdentity(state, identity) {
    state.identity = identity
  },
  setIdentityAttr(state, { key, value }) {
    // state.identity = state.identity || {}
    // this.$set(state.identity, key, value)
    state.identity[key] = value
  }
}
