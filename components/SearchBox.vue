<template>
  <div class="flex bg-white rounded-md w-64 border p-1">
    <input
      id="SearchBox"
      type="search"
      name="search"
      :placeholder="placeholder"
      class="p-1 bg-transparent w-full focus:outline-none"
      autocomplete="off"
      @focus="onFocus"
      @blur="onBlur"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="
        h-6
        w-6
        right-0
        mr-1
        mt-1
        text-gray-400
        duration-500
        ease-in-out
        color-blue-600
      "
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
      glassColor: '#cacaca'
    }
  },
  methods: {
    onFocus() {
      this.glassColor = '#0D67E5'
    },
    onBlur() {
      this.glassColor = '#cacaca'
    }
  }
}
</script>