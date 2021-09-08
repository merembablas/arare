<template>
  <div
    class="
      w-screen
      md:w-full
      items-center
      justify-center
      space-x-3
      md:space-x-7
      flex
      mt-5
      p-2
      align-middle
      bg-white
      border-gray-300 border-t-2 border-b-2
      md:border-l-2 md:border-r-2
      md:rounded-3xl
      text-sm
      h-auto
    "
  >
    <div
      v-for="i in items"
      :key="i"
      :class="`p-2 cursor-pointer ${
        currentActive == i
          ? 'rounded-2xl selected text-white'
          : 'hover:bg-blue-100 rounded-2xl'
      }`"
      @click="onClick(i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
    active: { type: Number, required: true, default: 0 },
    value: { type: String, required: true, default: '' }
  },
  data() {
    return {
      currentActive: this.items[this.active]
    }
  },
  methods: {
    onClick(i) {
      this.currentActive = i
      this.$emit('input', this.currentActive)
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #777d90;
}
</style>