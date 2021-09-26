
// import { mapMutations } from 'vuex'

// const itemStore = { ...mapMutations("items", ["setMyItems"]) }

export default ({ $axios, store }, inject) => {
    inject('arare', {
        '$store': store, fetchUsersItems(accountId, offset, limit) {
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ limit", limit)
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ offset", offset)
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ accountId", accountId)
            $axios.get(`/api/accounts/${accountId}/items?offset=${offset}&limit=${limit}`)
                .then(({ data: { error, result } }) => {
                    console.log("🚀 ~ file: arare.js ~ line 12 ~ .then ~ result", result)
                    if (error) {
                        throw error;
                    }
                    store.commit('items/setMyItems', result)
                })
        }, fetchMyItems(offset, limit) {
            const accountId = store.state.nuchain.currentAccount ? store.state.nuchain.currentAccount.address : store.state.eth.currentAccount
            this.fetchUsersItems(accountId, offset, limit)
        }
    })
}

