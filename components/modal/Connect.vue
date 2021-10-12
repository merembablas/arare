<template>
  <ModalBaseModal v-model="visible" custom-class="items-center">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Connect Account</h3>
    </template>
    <template #body>
      <client-only v-if="!showSignMessageWaitingDialog">
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
      <div
        v-if="showSignMessageWaitingDialog"
        class="flex flex-col justify-center items-center"
      >
        <div class="w-96 text-center">
          <h2>
            Please sign the message contains OTP code in your wallet to
            continue.
          </h2>
          <LoadingSmall />
          <p class="mt-2 pt-2">
            Arare.one uses this technique to verify that you’re the owner of the
            given address. The OTP code will expire in ~30 seconds.
          </p>
        </div>
      </div>
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
      accounts: [],
      showSignMessageWaitingDialog: false
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

          this.close()
        })

        // this.close()
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
      return `${duration}`
    },
    authenticateMetamask(account, cb) {
      const otp = this.getOTPCode()
      const message = `Please sign this message: ${otp}`
      const web3 = new Web3(window.ethereum)
      this.showSignMessageWaitingDialog = true
      // const hash = web3.utils.sha3(message)
      web3.eth.personal
        .sign(message, account)
        .then((signature) => {
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
        .finally(() =>
          setTimeout(() => (this.showSignMessageWaitingDialog = false), 100)
        )
    },
    authenticate(account, cb) {
      this.showSignMessageWaitingDialog = true

      // generate OTP code for for 30 seconds toleration
      const otp = this.getOTPCode()
      const message = `${otp}`

      this.$nuchain.signer
        .sign(account, message)
        .then((signature) => {
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
        .finally(() =>
          setTimeout(() => (this.showSignMessageWaitingDialog = false), 100)
        )
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

<style lang="less" scoped>
h2 {
  color: @text-color-1;
}
</style>
