<template>
  <label class="inline-flex items-center mt-3">
    <input
      type="checkbox"
      class="form-checkbox h-5 w-5 text-gray-600 rounded"
      :checked="checked"
    /><span class="ml-2 text-gray-700">{{ name }}</span>
  </label>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    checked: { type: Boolean, required: false }
  },
  data() {
    return {
      inSaving: false
    }
  }
}
</script>

<style>
</style>