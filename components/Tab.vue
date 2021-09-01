<template>
  <div
    class="
      w-auto
      items-center
      space-x-7
      flex
      mt-5
      p-2
      align-middle
      bg-white
      border-gray-300 border-2
      rounded-3xl
      h-auto
    "
  >
    <div
      v-for="i in items"
      :key="i"
      :class="`p-2 cursor-pointer rounded-2xl ${
        currentActive == i
          ? 'rounded-2xl selected text-white'
          : 'hover:bg-blue-100'
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
    active: { type: Number, required: true, default: 0 }
  },
  data() {
    return {
      currentActive: this.items[this.active]
    }
  },
  methods: {
    onClick(i) {
      this.currentActive = i
    }
  }
}
</script>

<style scoped>
.selected {
  background-color: #777d90;
}
</style>