<template>
  <label class="inline-flex items-center mt-3">
    <input
      v-model="dChecked"
      type="checkbox"
      :disabled="inSaving"
      :class="`form-checkbox h-5 w-5 text-gray-600 rounded ${
        inSaving ? 'bg-gray-300' : ''
      }`"
    /><span class="ml-2 text-gray-700">{{ name }}</span>
  </label>
</template>

<script>
import FormHelpers from './FormHelpers'
export default {
  extends: FormHelpers,
  props: {
    name: { type: String, required: true },
    useKey: { type: String, default: null },
    checked: { type: Boolean, required: false }
  },
  data() {
    return {
      inSaving: false,
      dChecked: this.checked
    }
  },
  methods: {
    getKey() {
      return this.useKey || this.normalizeKey(this.name)
    },
    getValue() {
      return this.checked
    },
    setDisabled(state) {
      this.inSaving = state
    }
  }
}
</script>

<style>
</style>