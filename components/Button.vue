<template>
  <button
    :class="`transition
      duration-500
      flex
      ease-in-out
      hover:-translate-y-1
      hover:scale-105
      rounded-xl
      ${colorClass}
      text-white
      ${iconMode ? 'pl-5 pr-2' : 'p-5'}
      py-2
      font-semibold
      hover:bg-purple-600
      button
      hover:shadow-md
      `"
    @click="onClick"
  >
    <div>{{ text }}</div>
    <div v-if="iconMode">
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    iconMode: { type: Boolean, default: false },
    colorClass: { type: String, default: 'bg-blue-600' }
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