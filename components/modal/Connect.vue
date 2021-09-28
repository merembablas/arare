<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Connect Account</h3>
    </template>
    <template #body>
      <client-only>
        <!-- PAGE 1 -->
        <div v-show="page === 1" class="flex space-x-10 w-96 justify-center">
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

        <!-- PAGE 2 -->
        <div v-show="page === 2" class="flex space-x-10 w-auto justify-center">
          <div class="flex flex-col">
            <div>Select account:</div>
            <div
              v-for="acc in accounts"
              :key="acc.address"
              class="
                p-2
                border-2
                rounded-xl
                flex
                mt-1
                cursor-pointer
                hover:bg-blue-100
              "
              @click="selectNuchainAccount(acc)"
            >
              <div class="w-auto rounded-full bg-color-gray-200"></div>
              <div>{{ acc.address }}</div>
            </div>
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
      visible: this.value,
      page: 1,
      accounts: []
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
      setCurrentEthAccountBalance: 'eth/setCurrentAccountBalance',
      setCurrentNuchainAccount: 'nuchain/setCurrentAccount',
      setUserIdentity: 'user/setIdentity',
      setJwtToken: 'user/setJwtToken'
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
      this.accounts = await this.$nuchainJs.web3Accounts()
      // this.addresses = accounts.map((acc) => acc.address)
      this.page = 2
    },
    selectNuchainAccount(account) {
      // const accounts = await this.$nuchainJs.web3Accounts()
      if (account) {
        // authenticate
        this.authenticate(account, ({ error }) => {
          if (error) {
            alert('Cannot authenticate, signature not verified,', error)
            return
          }
          this.setCurrentNuchainAccount(account)
          this.fetchAccountInfo(account.address)
        })

        this.close()
      } else {
        alert('Cannot connect :(')
      }
    },
    authenticate(account, cb) {
      // range to 30 seconds
      const duration = Math.floor(new Date().getTime() / 1000 / 30)
      console.log(
        '🚀 ~ file: Connect.vue ~ line 152 ~ authenticate ~ otp',
        duration
      )
      const message = `ch:${duration}`
      this.$nuchain.signer.sign(account, message).then((signature) => {
        // get jwt token from server by sending our signature
        this.$arare
          .authenticate(account.address, signature)
          .then(({ data: { error, result } }) => {
            if (error) {
              return alert('Cannot authenticate your account')
            }
            const token = result

            this.setJwtToken(token)

            const rv = { error, token }

            cb(rv)
          })
      })
    },
    fetchAccountInfo(cryptoAddress) {
      // untuk mendapatkan informasi account dan
      // meng-save ke store.user.identity
      this.$axios
        .get(`/api/accounts/${cryptoAddress}`)
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          this.setUserIdentity(result)
        })
        .catch((err) => {
          console.log(
            '🚀 ~ file: Connect.vue ~ line 159 ~ fetchAccountInfo ~ err',
            err
          )
          this.setUserIdentity(null)
        })
    }
  }
}
</script>

<style>
</style>
