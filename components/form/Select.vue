<template>
  <div class="mt-5 flex flex-col items-start justify-start w-full">
    <div>{{ name }}:</div>
    <select
      class="
        border-r border-t border-b border-solid border-gray-400
        rounded-xl
        outline-none
        focus:outline-none
        w-full
      "
    >
      <option v-for="item in items" :key="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
import FormHelpers from './FormHelpers'

export default {
  extends: FormHelpers,
  props: {
    name: { type: String, required: true },
    items: { type: Array, required: true },
    placeholder: { type: String, default: '' },
    multiLine: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false }
  },
  data() {
    return {
      inSaving: false,
      value: ''
    }
  },
  mounted() {
    if (this.autoFocus) {
      setTimeout(() => this.$refs.inputRef.focus(), 300)
    }
  },
  methods: {
    getKey() {
      return this.normalizeKey(this.name)
    },
    getValue() {
      return this.value
    }
  }
}
</script>

<style>
</style>