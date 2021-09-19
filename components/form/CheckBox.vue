<template>
  <label class="inline-flex items-center mt-3">
    <input
      v-model="dChecked"
      type="checkbox"
      class="form-checkbox h-5 w-5 text-gray-600 rounded"
    /><span class="ml-2 text-gray-700">{{ name }}</span>
  </label>
</template>

<script>
import FormHelpers from './FormHelpers'
export default {
  extends: FormHelpers,
  props: {
    name: { type: String, required: true },
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
      return this.normalizeKey(this.name)
    },
    getValue() {
      return this.checked
    }
  }
}
</script>

<style>
</style>