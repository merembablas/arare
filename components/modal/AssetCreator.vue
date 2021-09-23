<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Select object type</h3>
    </template>
    <template #body>
      <div
        class="text-lg flex flex-col items-start justify-start leading-relaxed"
      >
        <ModalCreateAssetSelectAsset
          v-if="page == 'select-type'"
          @item-click="onSelectType"
        />
        <ModalAssetCreatorUploadPicture v-if="page == 'upload-picture'" />
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
          v-if="prevPage"
          text="Back"
          color-class="bg-blue-400"
          class="w-42"
          @click="onBack"
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
      page: 'select-type',
      prevPage: null
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
    onCancel() {
      this.visible = false
      this.setPage('select-type')
      this.prevPage = null
      this.$emit('input', this.visible)
    },
    setPage(page) {
      this.prevPage = this.page
      this.page = page
    },
    onSelectType(type) {
      if (type === 'picture') {
        this.setPage('upload-picture')
      }
    },
    onBack() {
      if (!this.prevPage) {
        return
      }
      this.page = this.prevPage
      this.prevPage = null
    }
  }
}
</script>

<style>
</style>
