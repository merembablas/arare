<template>
  <div class="p-2 md:p-10">
    <div class="flex flex-col md:flex-row">
      <div v-if="identity" class="flex flex-col">
        <img :src="identityPic" alt="dummy" class="w-64 h-64 rounded-xl" />

        <form
          ref="formUpload"
          class="hidden"
          action="/uploader/upload_picture"
          method="post"
          enctype="multipart/form-data"
        >
          <input
            ref="imageUpload"
            type="file"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            name="picture"
            style="display: none"
            @change="onChange"
          />
        </form>
        <Button
          text="Change Photo"
          class="mt-5 w-full"
          @click="openFileSelector"
        />

        <div class="flex text-center justify-center mt-5">
          <NuxtLink class="link-color" :to="`/user/${identity.id}`">
            view profile page
          </NuxtLink>
        </div>
      </div>

      <div v-if="identity" class="flex flex-col ml-5 relative">
        <Button
          v-if="false"
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
          :value="identity.name"
          a-key="Name"
          :editable="true"
          :on-changed="updateName"
        />
        <ItemFieldInfo
          :value="identity.bio"
          a-key="Bio"
          :editable="true"
          :multi-line="true"
          :on-changed="updateBio"
        />
        <ItemFieldInfo
          :value="identity.twitter"
          a-key="Twitter"
          :editable="true"
          :on-changed="updateTwitter"
        />
        <ItemFieldInfo
          a-key="Instagram"
          :value="identity.instagram"
          :editable="true"
          :on-changed="updateInstagram"
        />
        <ItemFieldInfo
          a-key="Email"
          :value="identity.email"
          :editable="true"
          :on-changed="updateEmail"
        />
        <ItemFieldInfo a-key="Address">
          <NuchainAddress :address="accountAddress" :truncate="true" />
        </ItemFieldInfo>

        <FormCheckBox
          name="Creator"
          use-key="isCreator"
          :checked="identity.isCreator"
        />

        <div class="mt-5 pt-5">
          <Button text="Sync to on-chain data" />
          <Button
            text="Clear Data"
            color-class="bg-red-500"
            @click="clearData"
          />
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
import { mapMutations } from 'vuex'
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  layout: 'dashboard',
  data() {
    return {
      showRegisterDialog: false,
      identityPic: this.identity ? this.identity.pic : null,
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
    this.identityPic = this.identity?.pic
  },
  methods: {
    ...mapMutations('user', ['setIdentity', 'setIdentityAttr']),
    async updateName(newName) {
      console.log(
        '🚀 ~ file: index.vue ~ line 69 ~ updateName ~ newName',
        newName
      )
      await this.updateAccount({ name: newName })
      this.setIdentityAttr({ key: 'name', value: newName })
      //   await new Promise((resolve, reject) => {
      //     setTimeout(() => resolve(true), 1500)
      //   })
    },
    async updateBio(newBio) {
      await this.updateAccount({ bio: newBio })
      this.setIdentityAttr({ key: 'bio', value: newBio })
    },
    async updateTwitter(newTwitter) {
      await this.updateAccount({ twitter: newTwitter })
      this.setIdentityAttr({ key: 'twitter', value: newTwitter })
    },
    async updateInstagram(newInstagram) {
      await this.updateAccount({ instagram: newInstagram })
      this.setIdentityAttr({ key: 'instagram', value: newInstagram })
    },
    async updateEmail(newEmail) {
      await this.updateAccount({ email: newEmail })
      this.setIdentityAttr({ key: 'email', value: newEmail })
    },
    clearData() {
      this.setIdentity(null)
    },
    async updateAccount(updateQuery) {
      return await this.$axios.post('/api/account/update', updateQuery)
    },
    openFileSelector() {
      this.$refs.imageUpload.click()
    },
    onChange() {
      this.upload()
    },
    upload() {
      const formData = new FormData()
      formData.append('picture', this.$refs.imageUpload.files[0])
      this.$axios
        .post('/uploader/upload_picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data: { error, url, hash, fileExtension } }) => {
          if (error) {
            alert(error)
          } else {
            // this.$emit('on-success', { url, hash, fileExtension })
            console.log(
              '🚀 ~ file: index.vue ~ line 202 ~ .then ~ { url, hash, fileExtension }',
              { url, hash, fileExtension }
            )
            this.$axios
              .post('/api/account/update', {
                image: `hash://${hash}${fileExtension}`
              })
              .then(({ data: { error } }) => {
                if (error) {
                  alert(error)
                }
                this.identityPic = `${process.env.baseUploadUrl}/${hash}${fileExtension}`
                this.setIdentityAttr({ key: 'pic', value: this.identityPic })
              })
          }
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style lang="less"></style>
