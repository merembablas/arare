<template>
  <div class="p-10">
    <div class="flex">
      <div v-if="identity" class="flex flex-col">
        <img
          src="https://www.thispersondoesnotexist.com/image"
          alt="dummy"
          class="w-64 h-64 rounded-xl"
        />
        <Button text="Change Photo" class="mt-5" />
      </div>

      <div v-if="identity" class="flex flex-col ml-5 relative">
        <Button
          text="Edit"
          :icon-mode="true"
          class="w-24 absolute"
          style="right: 10px"
        >
          <template #icon>
            <IconEditPencil />
          </template>
        </Button>
        <ItemFieldInfo
          :value="identity.fullName"
          a-key="Full name"
          :editable="true"
          :on-changed="updateFullname"
        />
        <ItemFieldInfo
          v-model="identity.bio"
          a-key="Bio"
          :editable="true"
          :multi-line="true"
          :on-changed="updateBio"
        />
        <ItemFieldInfo
          v-model="identity.twitter"
          a-key="Twitter"
          :editable="true"
        />
        <ItemFieldInfo a-key="Instagram" :value="identity.instagram" />
        <ItemFieldInfo a-key="Email" :value="identity.email" />
        <ItemFieldInfo a-key="Address">
          <NuchainAddress :address="accountAddress" :truncate="false" />
        </ItemFieldInfo>

        <div class="mt-5 pt-5">
          <Button text="Sync to on-chain data" />
        </div>
      </div>

      <!-- when user not have identity yet, show register button -->
      <div v-if="!identity" class="flex flex-col ml-5 relative">
        <h1>You have no identity data</h1>
        <p class="mt-5">
          Please set your identity data so you will easily recognized by
          community members.
        </p>
        <Button
          text="Set identity now"
          class="mt-5 w-64"
          @click="showRegisterDialog = true"
        />
      </div>

      <ModalRegister v-model="showRegisterDialog" />
    </div>
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'

export default {
  extends: AccountMethods,
  layout: 'dashboard',
  data() {
    return {
      showRegisterDialog: false,
      userBio:
        'Creator of minimalistic bold graphic and digital artwork. ✹ Artist / Creative Director ✹ #NFT minting'
    }
  },
  computed: {
    identity() {
      return this.getCurrentIdentity()
    }
  },
  watch: {
    userBio(newBio) {
      console.log('newBio:', newBio)
    },
    user(newUser) {
      console.log('🚀 ~ file: index.vue ~ line 63 ~ user ~ newUser', newUser)
    }
  },
  mounted() {
    console.log('this.getCurrentIdentity():', this.getCurrentIdentity())
  },
  methods: {
    async updateFullname(newFullname) {
      console.log(
        '🚀 ~ file: index.vue ~ line 69 ~ updateFullname ~ newFullname',
        newFullname
      )
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 1500)
      })
    },
    async updateBio(newBio) {
      await new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 1500)
      })
    }
  }
}
</script>


<style lang="less">
</style>