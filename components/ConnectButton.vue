<template>
  <div>
    <div v-if="loaded" class="relative">
      <div
        v-if="account"
        class="cursor-pointer bg-gray-200 p-2 rounded"
        @mouseenter="showMenu(true)"
        @mouseleave="showMenu(false)"
        @click="showMenu(true)"
      >
        <div class="flex items-center">
          <div
            v-if="isNuchain"
            class="w-5 h-5"
            :style="`background: url('/img/nuchain-icon.png') no-repeat center center; background-size: cover;`"
          ></div>
          <div
            v-if="isMetamask"
            class="w-5 h-5"
            :style="`background: url('${require('~/assets/img/metamask.svg')}') no-repeat center center; background-size: cover;`"
          ></div>
          <div class="ml-2">{{ formattedAddress }}</div>
        </div>
      </div>
      <button
        v-if="!account"
        class="focus:outline-none bg-green-500 p-2 rounded-xl text-white flex"
        @click="onClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span class="mx-1">Connect</span>
      </button>
      <div
        v-show="showMenuState"
        class="
          bg-white
          absolute
          p-4
          border-2 border-gray-2
          rounded-b-xl
          z-40
          personal-menu
        "
        @mouseenter="showMenu(true)"
        @mouseleave="showMenu(false)"
      >
        <div class="flex flex-col">
          <NuxtLink to="/dashboard" class="p-2 hover:bg-blue-100 rounded"
            >Dashboard</NuxtLink
          >
          <div
            class="text-semibold cursor-pointer p-2 hover:bg-blue-100 rounded"
            @click="logout"
          >
            Logout
          </div>
        </div>
      </div>
      <ModalConnect v-model="showConnectModal" title="Connect Account" />
    </div>
    <!-- dummy tombol button untuk SSR, akan digantikan 
         dg real tombol setelah selesai SSR-nya -->
    <button
      v-else
      class="focus:outline-none bg-gray-400 p-2 rounded-xl text-white flex"
      disabled
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <span class="mx-1">Connect</span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import AccountMethods from '~/components/AccountMethods'

let menuTimeout = null

export default {
  extends: AccountMethods,
  data() {
    return {
      showMenuState: false,
      showConnectModal: false,
      loaded: false
    }
  },
  computed: {
    // account() {
    //   return (
    //     this.$store.state.eth.currentAccount ||
    //     this.$store.state.nuchain.currentAccount
    //   )
    // },
    // isNuchain() {
    //   return this.account && this.account.meta && this.account.address
    // },
    // isMetamask() {
    //   return !this.isNuchain
    // },
    formattedAddress() {
      let account = this.account
      if (!account) {
        return '?'
      }
      if (this.isNuchain) {
        // nuchain account object
        account = account.address
      }
      return this.$formatter.truncateCryptoAddress(
        // this.$store.state.eth.currentAccount
        account
      )
    }
  },
  mounted() {
    this.loaded = true
  },
  methods: {
    ...mapMutations({
      setCurrentEthAccount: 'eth/setCurrentAccount',
      setCurrentNuchainAccount: 'nuchain/setCurrentAccount',
      setIdentity: 'user/setIdentity',
      setJwtToken: 'user/setJwtToken'
    }),
    onClick() {
      this.showConnectModal = true
    },
    showMenu(visibility) {
      if (visibility === false) {
        menuTimeout = setTimeout(() => {
          this.showMenuState = false
        }, 500)
        return
      }
      if (menuTimeout) {
        clearTimeout(menuTimeout)
      }
      this.showMenuState = visibility
    },
    logout() {
      this.setCurrentEthAccount(null)
      this.setCurrentNuchainAccount(null)
      this.setIdentity(null)
      this.setJwtToken(null)
      this.showMenuState = false
    }
  }
}
</script>

<style lang="less">
.personal-menu {
  right: 5px;
  top: 39px;
}
</style>