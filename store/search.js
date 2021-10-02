export const state = () => ({
    searchResult: []
})

export const mutations = {
    setSearchResult(state, items) {
        state.searchResult = items
    }
}

