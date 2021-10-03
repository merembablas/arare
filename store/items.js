export const state = () => ({
    myItems: [],
    myItemCount: 0
})

export const getters = {
    getMyItemCount(state) { return state.myItemCount }
}

export const mutations = {
    setMyItems(state, items) {
        state.myItems = items
    },
    setMyItemCount(state, count) {
        state.myItemCount = count
    }
}