
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
        },
        fetchMostValuedItems() {
            return $axios.get(`${baseEndpoint}/item/valued`)
        },
        fetchLatestItems() {
            return $axios.get(`${baseEndpoint}/item/latest`)
        },
        fetchPopularCreators(offset, limit) {
            return $axios.get(`${baseEndpoint}/creator/popular?offset=${offset}&limit=${limit}`)
        },
        authenticate(accountAddress, signature) {
            return $axios.post(`${baseEndpoint}/auth/authenticate`, { accountAddress, signature })
        },
        authenticateMetamask(accountAddress, signature) {
            return $axios.post(`${baseEndpoint}/auth/authenticate-metamask`, { accountAddress, signature })
        },
        authRefreshToken() {
            return $axios.post('/api/auth/refresh-token')
        }
    }
    inject('arare', methods)
}

