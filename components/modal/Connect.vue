<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Connect Account</h3>
    </template>
    <template #body>
      <client-only>
        <div class="flex space-x-10 w-96 justify-center">
          <div
            class="
              flex flex-col
              items-center
              justify-center
              cursor-pointer
              border-0
              hover:bg-blue-100
              p-2
              rounded-xl
            "
            @click="connectMetamask"
          >
            <div
              class="w-16 h-16"
              :style="`background: url('${require('~/assets/img/metamask.svg')}') no-repeat center center; background-size: cover;`"
            ></div>
            <div>Metamask</div>
          </div>

          <div
            class="
              flex flex-col
              items-center
              justify-center
              cursor-pointer
              border-0
              hover:bg-blue-100
              p-2
              rounded-xl
            "
            @click="connectNuchain"
          >
            <div
              class="w-16 h-16"
              :style="`background: url('/img/nuchain-icon.png') no-repeat center center; background-size: cover;`"
            ></div>
            <div>Nuchain App</div>
          </div>
        </div>
      </client-only>
    </template>
  </ModalBaseModal>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    value: { type: Boolean, default: false } // for visibility toggle
  },
  data() {
    return {
      visible: this.value
    }
  },
  watch: {
    value(b, a) {
      this.visible = b
      this.$emit('input', this.visible)
    },
    visible(visibility) {
      this.$emit('input', visibility)
    }
  },
  methods: {
    ...mapMutations({
      setCurrentEthAccount: 'eth/setCurrentAccount',
      setCurrentNuchainAccount: 'nuchain/setCurrentAccount'
    }),
    onCancel() {
      this.close()
    },
    close() {
      this.visible = false
      this.$emit('input', this.visible)
    },
    async connectMetamask() {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts && accounts[0]) {
        this.setCurrentEthAccount(accounts[0])
        this.close()
      } else {
        alert('Cannot connect :(')
      }
    },
    async connectNuchain() {
      const connected = await this.$nuchainJs.web3Enable('Arare.one')
      if (!connected) {
        alert('Cannot connect #1 :(')
        return
      }
      const accounts = await this.$nuchainJs.web3Accounts()
      console.log(accounts)
      if (accounts && accounts[0]) {
        this.setCurrentNuchainAccount(accounts[0])
        this.close()
      } else {
        alert('Cannot connect :(')
      }
    }
  }
}
</script>

<style>
</style>
