<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Register</h3>
    </template>
    <template #body>
      <div
        class="text-lg flex flex-col items-start justify-start leading-relaxed"
      >
        <FormSmartForm ref="form" :disabled="inProcess">
          <FormInputText name="Name" :auto-focus="true" />
          <FormInputText name="Bio" :multi-line="true" />
          <FormCheckBox name="I am creator" use-key="isCreator" />
        </FormSmartForm>
      </div>
    </template>
    <template #actions>
      <div
        class="
          flex
          items-center
          justify-end
          space-x-5
          p-6
          border-t border-solid border-blueGray-200
          rounded-b
        "
      >
        <Button
          text="Cancel"
          color-class="bg-red-600"
          class="w-full"
          @click="onCancel"
        />
        <Button
          text="Register"
          color-class="bg-green-600"
          @click="onRegister"
        />
      </div>
    </template>
  </ModalBaseModal>
</template>

<script>
import { mapMutations } from 'vuex'
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  props: {
    value: { type: Boolean, default: false } // for visibility toggle
  },
  data() {
    return {
      visible: this.value,
      inProcess: false
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
  mounted() {
    this.inProcess = false
  },
  methods: {
    ...mapMutations('user', ['setIdentity', 'setJwtToken']),
    onCancel() {
      this.visible = false
      this.$emit('input', this.visible)
    },
    onRegister() {
      const encoded = this.$refs.form.toJSON()
      if (!this.accountType) {
        alert('Unknown account type')
        return
      }
      encoded.accountType = this.accountType
      if (this.isNuchain) {
        encoded.nuchainAddress = this.accountAddress
      } else if (this.isMetamask) {
        encoded.ethAddress = this.accountAddress
      }
      encoded.primaryAddress = this.accountAddress

      console.log(
        '🚀 ~ file: Register.vue ~ line 72 ~ onRegister ~ encoded',
        encoded
      )

      this.inProcess = true

      this.$axios
        .post('/api/account/register', encoded)
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          console.log(
            '🚀 ~ file: Register.vue ~ line 92 ~ this.$axios.post ~ result',
            result
          )
          // refersh access token
          this.$arare.authRefreshToken().then(({ data: { error, result } }) => {
            if (error) {
              alert('Cannot refresh token,', error)
              return
            }
            this.setJwtToken(result)
          })
          this.setIdentity(result)
        })
        .catch((err) => alert(err))
        .finally(() => (this.inProcess = false))

      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  }
}
</script>

<style>
</style>
