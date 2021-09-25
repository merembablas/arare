<template>
  <div>
    <div
      v-if="!inputBoxMobileVisible"
      :class="`text-gray-400 bg-gray-200 p-2 md:hidden rounded-xl`"
      @click="showInputBox(true)"
    >
      <IconSearch color="#0d67e5" />
    </div>
    <div
      :class="`
        relative
        text-gray-400
        focus-within:text-gray-600
        md:flex
        justify-center
        border-gray-200 border-2
        rounded-xl
        ${inputBoxMobileVisible ? '' : 'hidden'}
      `"
    >
      <div style="position: absolute; left: 2px; top: 3px">
        <IconSearch :color="glassColor" />
      </div>
      <input
        ref="inputBox"
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
      inFocus: false,
      inputBoxMobileVisible: false
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
      this.showInputBox(false)
    },
    showInputBox(state) {
      this.inputBoxMobileVisible = state
      if (state) {
        setTimeout(() => {
          this.$refs.inputBox.focus()
        }, 300)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>