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
  }
}
