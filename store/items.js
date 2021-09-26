export const state = () => ({
    myItems: []
})

export const mutations = {
    setMyItems(state, items) {
        state.myItems = items
    }
}