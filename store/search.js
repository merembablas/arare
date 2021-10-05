export const state = () => ({
    currentQuery: "",
    searchResult: []
})

export const mutations = {
    setSearchResult(state, items) {
        state.searchResult = items
    },
    setCurrentQuery(state, query) {
        state.currentQuery = query
    }
}

