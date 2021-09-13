<template>
  <div class="relative">
    <div
      v-if="account"
      class="cursor-pointer bg-gray-200 p-2"
      @mouseenter="showMenu(true)"
      @mouseleave="showMenu(false)"
    >
      {{ formattedAddress }}
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
      class="bg-white absolute p-2 border-2 border-gray-2 rounded-b-xl z-40"
      @mouseenter="showMenu(true)"
      @mouseleave="showMenu(false)"
    >
      <div class="flex flex-col">
        <NuxtLink to="/dashboard" class="p-2 hover:bg-blue-100 rounded"
          >Dashboard</NuxtLink
        >
        <!-- <div class="border-2 border-b-gray"></div> -->
        <div
          class="text-semibold cursor-pointer p-2 hover:bg-blue-100 rounded"
          @click="logout"
        >
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

let menuTimeout = null

export default {
  data() {
    return {
      showMenuState: false
    }
  },
  computed: {
    account() {
      return this.$store.state.eth.currentAccount
    },
    formattedAddress() {
      return this.$formatter.truncateCryptoAddress(
        this.$store.state.eth.currentAccount
      )
    }
  },
  methods: {
    ...mapMutations({ setCurrentAccount: 'eth/setCurrentAccount' }),
    async onClick() {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts && accounts[0]) {
        this.setCurrentAccount(accounts[0])
      }
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
      this.setCurrentAccount(null)
      this.showMenuState = false
    }
  }
}
</script>

<style>
</style>