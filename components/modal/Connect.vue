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
const Web3 = require('web3')
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
      if (typeof window.ethereum === 'undefined') {
        alert('Metamask not detected. Please install Metamask first')
        return
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      if (accounts && accounts[0]) {
        this.authenticateMetamask(accounts[0], ({ error }) => {
          if (error) {
            return alert('Cannot authenticate Metamask')
          }
          this.setCurrentEthAccount(accounts[0])
          this.fetchAccountInfo(accounts[0])
          this.close()
        })
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
      if (this.accounts.length === 0) {
        alert(
          'You have no nuchain accounts, please use Nuchain App extension to connect'
        )
        return
      }
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
    getOTPCode() {
      const duration = Math.floor(new Date().getTime() / 1000 / 30)
      console.log(
        '🚀 ~ file: Connect.vue ~ line 152 ~ authenticate ~ otp',
        duration
      )
      return `ch:${duration}`
    },
    authenticateMetamask(account, cb) {
      const message = this.getOTPCode()
      const web3 = new Web3(window.ethereum)
      const hash = web3.utils.sha3(message)
      web3.eth.personal.sign(hash, account).then((signature) => {
        this.$arare
          .authenticateMetamask(account, signature)
          .then(({ data: { error, result } }) => {
            if (error) {
              return alert('Cannot authenticate eth account')
            }
            const token = result
            this.setJwtToken(token)
            const rv = { error, token }
            cb(rv)
          })
      })
    },
    authenticate(account, cb) {
      // range to 30 seconds
      const message = this.getOTPCode()
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
