<template>
  <div class="mt-5 flex flex-col items-start justify-start w-full">
    <div>{{ name }}:</div>

    <input
      v-if="!multiLine"
      ref="inputRef"
      v-model="value"
      type="text"
      :class="`
        p-2
        block
        border-2 border-solid border-gray-300
        outline-none
        focus:outline-none
        rounded-xl
        w-full
        ${inSaving ? 'bg-gray-300' : ''}
        `"
      :disabled="inSaving"
      :placeholder="placeholder"
    />

    <textarea
      v-if="multiLine"
      ref="inputRef"
      v-model="value"
      :class="`w-full border-2 border-gray-300 p-2 rounded-xl outline-none ${
        inSaving ? 'bg-gray-300' : ''
      }`"
      cols="30"
      rows="3"
      :disabled="inSaving"
    ></textarea>
  </div>
</template>

<script>
import FormHelpers from './FormHelpers'

export default {
  extends: FormHelpers,
  props: {
    name: { type: String, required: true },
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