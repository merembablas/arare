<template>
  <BaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">{{ title }}</h3>
    </template>
    <template #body>
      <slot />
    </template>
    <template #actions>
      <div
        class="
          flex
          items-center
          justify-end
          p-6
          border-t border-solid border-blueGray-200
          rounded-b
        "
      >
        <button
          class="
            text-red-500
            bg-transparent
            border border-solid border-red-500
            hover:bg-red-500
            hover:text-white
            active:bg-red-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
          type="button"
          @click="toggleModal()"
        >
          Close
        </button>
        <button
          class="
            text-red-500
            background-transparent
            font-bold
            uppercase
            px-6
            py-2
            text-sm
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
          type="button"
          @click="toggleModal()"
        >
          Save Changes
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false }, // for visibility toggle
    title: { type: String, default: 'Confirmation' }
  },
  data() {
    return {
      visible: this.value
    }
  },
  methods: {
    toggleModal() {
      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  }
}
</script>

<style>
</style>