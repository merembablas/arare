<template>
  <div class="mt-5 flex flex-col items-start justify-start w-full">
    <div>{{ name }}:</div>

    <input
      v-if="!multiLine"
      ref="inputRef"
      type="text"
      class="
        p-2
        block
        border-2 border-solid border-gray-300
        outline-none
        focus:outline-none
        rounded-xl
        w-full
      "
      :placeholder="placeholder"
    />

    <textarea
      v-if="multiLine"
      ref="inputRef"
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
export default {
  props: {
    name: { type: String, required: true },
    placeholder: { type: String, default: '' },
    multiLine: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false }
  },
  data() {
    return {
      inSaving: false
    }
  },
  mounted() {
    if (this.autoFocus) {
      setTimeout(() => this.$refs.inputRef.focus(), 300)
    }
  }
}
</script>

<style>
</style>