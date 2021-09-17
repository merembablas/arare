<template>
  <div class="p-10">
    <div class="flex">
      <div class="flex flex-col">
        <img
          src="https://www.thispersondoesnotexist.com/image"
          alt="dummy"
          class="w-64 h-64 rounded-xl"
        />
        <Button text="Change Photo" class="mt-5" />
      </div>

      <div class="flex flex-col ml-5 relative">
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
          :value="user.fullName"
          a-key="Full name"
          :editable="true"
          :on-changed="updateFullname"
        />
        <ItemFieldInfo
          v-model="userBio"
          a-key="Bio"
          :editable="true"
          :multi-line="true"
          :on-changed="updateBio"
        />
        <ItemFieldInfo
          v-model="user.twitter"
          a-key="Twitter"
          :editable="true"
        />
        <ItemFieldInfo a-key="Instagram" value="@arya" />
        <ItemFieldInfo a-key="Email" value="arya@stark.com" />
        <ItemFieldInfo a-key="Address">
          <NuchainAddress
            address="5E5AsQiCsgubinh7DzzzS4LBbtv9H3NvZep7mk1Li3uNNvie"
            :truncate="false"
          />
        </ItemFieldInfo>

        <div class="mt-5 pt-5">
          <Button text="Sync to on-chain data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      user: { fullName: 'Arya Syailendra', twitter: '@hello' },
      userBio:
        'Creator of minimalistic bold graphic and digital artwork. ✹ Artist / Creative Director ✹ #NFT minting'
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
.headline {
  font-family: 'RobotoSlab bold', Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #0d67e5;
  line-height: 1em;
}
p {
  color: #6c7080;
  font-size: 1.7em;
  font-weight: bold;
}
</style>