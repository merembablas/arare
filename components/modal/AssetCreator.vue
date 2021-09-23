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
          <ModalAssetCreatorUploadPicture v-if="objectType === 'picture'" />
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
          @click="onCancel"
        />
        <Button
          v-if="page > 1"
          text="Back"
          color-class="bg-blue-400"
          class="w-42"
          @click="onBack"
        />
        <Button
          v-if="hasNext"
          text="Next"
          color-class="bg-green-500"
          class="w-42"
          @click="onNext"
        />
        <!-- <Button text="Next" color-class="bg-green-600" @click="setPage(2)" /> -->
      </div>
    </template>
  </ModalBaseModal>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
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
      title: 'Select object type'
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
    onCancel() {
      this.visible = false
      this.reset()
      this.$emit('input', this.visible)
    },
    setPage(page) {
      this.prevPage = this.page
      this.page = page
    },
    onSelectType(type) {
      this.setPage(2)
      this.objectType = type
      if (this.page > 1) {
        this.title = 'Create NFT'
      } else if (this.page === 1) {
        this.title = 'Select object type'
      }

      this.hasNext = this.page > 1 && this.page < 3
    },
    onBack() {
      if (!this.prevPage) {
        return
      }
      this.page = this.page - 1
      this.hasNext = this.page > 1 && this.page < 3
    },
    onNext() {}
  }
}
</script>

<style>
</style>
