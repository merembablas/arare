export default ({ $axios, store }) => {
    $axios.onRequest(config => {
        config.headers.common.Authorization = `Bearer ${store.state.user.jwtToken}`;
        console.log("🚀 ~ file: axios.client.js ~ line 4 ~ config.headers.common['Authorization']", config.headers.common.Authorization)
    });
}

