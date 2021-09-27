
// import { mapMutations } from 'vuex'

// const itemStore = { ...mapMutations("items", ["setMyItems"]) }

const baseEndpoint = '/api'

export default ({ $axios, store }, inject) => {
    const methods = {
        handleResult(error, key, data) {
            console.log("🚀 ~ file: arare.js ~ line 12 ~ .then ~ data", data)
            if (error) {
                throw error;
            }
            store.commit(key, data)
        },
        fetchUsersItems(accountId, offset, limit) {
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ limit", limit)
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ offset", offset)
            console.log("🚀 ~ file: arare.js ~ line 10 ~ fetchUsersItems ~ accountId", accountId)
            $axios.get(`${baseEndpoint}/accounts/${accountId}/items?offset=${offset}&limit=${limit}`)
                .then(({ data: { error, result } }) => {
                    this.handleResult(error, 'items/setMyItems', result)
                })
        },
        fetchMyItems(offset, limit) {
            // const accountId = store.state.nuchain.currentAccount ? store.state.nuchain.currentAccount.address : store.state.eth.currentAccount
            const accountId = store.state.user.identity.id
            this.fetchUsersItems(accountId, offset, limit)
        },
        fetchItem(itemId) {
            return $axios.get(`${baseEndpoint}/items/${itemId}`)
            // .then(({data: {error, item}}) => {
            //     this.handleResult(error, 'items/setItem', item)
            // })
        },
        fetchPopularItems() {
            return $axios.get(`${baseEndpoint}/item/popular`)
        }
    }
    inject('arare', methods)
}

