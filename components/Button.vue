<template>
  <button
    :class="`transition
      duration-500
      flex
      ease-in-out
      hover:-translate-y-1
      hover:scale-105
      rounded-xl
      ${disabled ? 'bg-gray-300' : colorClass}
      text-white
      ${iconMode ? 'pl-2 pr-2 md:pr-3' : 'p-5'}
      py-2
      font-semibold
      ${disabled ? '' : 'hover:bg-purple-600'}
      button
      hover:shadow-md
      text-center items-center justify-center
      `"
    :disabled="disabled"
    @click="onClick"
  >
    <div v-if="iconMode">
      <slot name="icon"></slot>
    </div>
    <div
      :class="`${iconMode ? 'ml-2' : ''} ${
        iconOnMobile ? 'hidden md:block' : ''
      }`"
    >
      {{ text }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    iconMode: { type: Boolean, default: false },
    colorClass: { type: String, default: 'bg-blue-600' },
    disabled: { type: Boolean, default: false },
    iconOnMobile: { type: Boolean, default: false }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style>
</style>