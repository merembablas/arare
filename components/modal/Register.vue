<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Register</h3>
    </template>
    <template #body>
      <div
        class="text-lg flex flex-col items-start justify-start leading-relaxed"
      >
        <FormInputText name="Full name" :auto-focus="true" />
        <FormInputText name="Bio" :multi-line="true" />
        <FormCheckBox name="I am creator" />
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
export default {
  props: {
    value: { type: Boolean, default: false } // for visibility toggle
  },
  data() {
    return {
      visible: this.value
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
    onCancel() {
      this.visible = false
      this.$emit('input', this.visible)
    },
    onRegister() {
      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  }
}
</script>

<style>
</style>
