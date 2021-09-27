<template>
  <button
    :class="`
      flex
      ${
        disabled
          ? ''
          : 'transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105'
      }
      rounded-xl
      ${disabled ? 'bg-gray-300' : colorClass}
      text-white
      ${iconMode ? 'pl-2 pr-2 md:pr-3' : 'p-5'}
      py-2
      font-semibold
      ${disabled ? '' : 'hover:bg-purple-600 hover:shadow-md'}
      button
      text-center items-center justify-center
      ${loading ? 'cursor-wait' : ''}
      `"
    :disabled="disabled"
    @click="onClick"
  >
    <div v-if="iconMode && !loading">
      <slot name="icon"></slot>
    </div>
    <div v-if="loading">
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
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
    iconOnMobile: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
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