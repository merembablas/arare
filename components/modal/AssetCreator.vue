<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">{{ title }}</h3>
    </template>
    <template #body>
      <div
        class="text-lg flex flex-col items-start justify-start leading-relaxed"
      >
        <ModalCreateAssetSelectAsset
          v-if="page === 1"
          @item-click="onSelectType"
        />
        <div v-if="page === 2">
          <ModalAssetCreatorUploadPicture
            v-if="objectType === 'picture'"
            @in-process="onInProcess"
            @on-success="onUploadPictureSuccess"
          />
        </div>
        <div v-if="page === 3">
          <LazyModalAssetCreatorSetAttributes
            ref="attributes"
            :in-process="inProcess"
            :thumbnail="thumbnail"
          />
        </div>
      </div>
    </template>
    <template #actions>
      <div
        class="
          flex
          items-center
          justify-center
          space-x-5
          p-6
          border-t border-solid border-blueGray-200
          rounded-b
        "
      >
        <Button
          text="Cancel"
          color-class="bg-red-600"
          class="w-42"
          :loading="inProcess"
          :disabled="inProcess"
          @click="onCancel"
        />
        <Button
          v-if="page > 1"
          text="Back"
          color-class="bg-blue-400"
          class="w-42"
          :loading="inProcess"
          :disabled="inProcess"
          @click="onBack"
        />
        <Button
          v-if="hasNext"
          :text="nextCaption"
          color-class="bg-green-500"
          class="w-42"
          :loading="inProcess"
          :disabled="inProcess"
          @click="onNext"
        />
        <!-- <Button text="Next" color-class="bg-green-600" @click="setPage(2)" /> -->
      </div>
    </template>
  </ModalBaseModal>
</template>

<script>
// import { mapMutations } from 'vuex'
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  props: {
    value: { type: Boolean, default: false } // for visibility toggle
  },
  data() {
    return {
      visible: this.value,
      page: 1,
      prevPage: 0,
      hasNext: false,
      objectType: null,
      title: 'Select object type',
      thumbnail:
        'http://localhost:3000/uploads/up_the_hillside_by_donmalo-d82ehde.png',
      nextCaption: 'Next',
      extraData: {},
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
  methods: {
    // ...mapMutations('user', ['setIdentity']),
    reset() {
      this.title = 'Select object type'
      this.setPage(1)
      this.prevPage = 0
      this.hasNext = false
    },
    close() {
      this.visible = false
      this.reset()
      this.$emit('input', this.visible)
    },
    onCancel() {
      this.close()
    },
    setPage(page) {
      this.prevPage = this.page
      this.page = page
    },
    onSelectType(type) {
      console.log(
        '🚀 ~ file: AssetCreator.vue ~ line 119 ~ onSelectType ~ type',
        type
      )
      this.setPage(2)
      this.objectType = type
      if (this.page > 1) {
        this.title = 'Create NFT'
      } else if (this.page === 1) {
        this.title = 'Select object type'
      }

      this.hasNext = this.page > 2 && this.page < 3
    },
    onBack() {
      if (!this.prevPage) {
        return
      }
      this.page = this.page - 1
      this.hasNext = this.page > 1 && this.page < 3
    },
    onNext() {
      if (this.page === 3) {
        this.inProcess = true
        const data = this.$refs.attributes.getMapped()
        data.hash = this.extraData.hash
        data.objectType = this.extraData.objectType
        data.fileExtension = this.extraData.fileExtension
        data.ownerAddress = this.accountAddressWithPrefix
        console.log(
          '🚀 ~ file: AssetCreator.vue ~ line 132 ~ onNext ~ data',
          data
        )
        this.$axios
          .post('/api/item/mint', data)
          .then(({ data: { error, hash, id } }) => {
            this.inProcess = false
            if (error) {
              alert(error)
              return
            }
            this.$arare.fetchMyItems(0, 20)
            this.close()
          })
      }
    },
    onUploadPictureSuccess({ url, hash, fileExtension }) {
      this.thumbnail = url
      this.extraData.hash = hash
      this.extraData.objectType = 'picture'
      this.extraData.fileExtension = fileExtension
      this.setPage(3)
      this.hasNext = true
      this.nextCaption = 'Mint'
    },
    onInProcess(state) {
      this.inProcess = state
    }
  }
}
</script>

<style>
</style>
