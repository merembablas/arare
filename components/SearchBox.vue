<template>
  <div
    class="
      relative
      text-gray-400
      focus-within:text-gray-600
      flex
      justify-center
      border-gray-200 border-2
      rounded-xl
    "
  >
    <div style="position: absolute; left: 2px; top: 3px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-400 duration-500 ease-in-out color-blue-600"
        :fill="glassColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <input
      :class="`
        pl-8
        pt-1
        pb-1
        focus:ring-2 focus:ring-gray-300
        outline-none
        focus:outline-none
        rounded-xl
        ${inFocus ? 'w-96' : 'w-full'}`"
      autocomplete="off"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search keyword/item id'
    }
  },
  data() {
    return {
      glassColor: '#cacaca',
      inFocus: false
    }
  },
  methods: {
    onFocus() {
      this.glassColor = '#0D67E5'
      this.inFocus = true
    },
    onBlur() {
      this.glassColor = '#cacaca'
      this.inFocus = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>