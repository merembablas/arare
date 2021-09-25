export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Arare',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    env: {
        nuchainEndpoint: process.env.NUCHAIN_ENDPOINT,
        baseUploadUrl: process.env.BASE_UPLOAD_URL,
        uploadDir: process.env.UPLOAD_DIR,
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['~/assets/css/main'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/dummy',
        '~/plugins/persistedState.client.js',
        '~/plugins/formatter.client.js',
        '~/plugins/nuchain.client.js'
    ],

    serverMiddleware: {
        '/uploader': '~/server-middleware/uploader.js'
    },

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // Dotenv env var loader
        '@nuxtjs/dotenv',
        // https://go.nuxtjs.dev/eslint
        ['@nuxtjs/eslint-module', { fix: true }],
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        // untuk bisa akses less variable di setiap komponen
        '@nuxtjs/style-resources'
    ],

    styleResources: {
        less: ['~/assets/css/variables.less', '~/assets/css/linear-gradient.less']
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {}
}
