<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: { disabled: { type: Boolean, default: false } },
  watch: {
    disabled(state) {
      this.setDisabled(state)
    }
  },
  mounted() {
    console.log('form childrens:', this.$children)
    this.setDisabled(this.disabled)
  },
  methods: {
    clear() {
      for (let i = 0; i < this.$children.length; i++) {
        const item = this.$children[i]
        item.clear()
      }
    },
    toJSON() {
      const encoded = {}
      for (let i = 0; i < this.$children.length; i++) {
        const item = this.$children[i]
        if (item.getValue) {
          encoded[item.getKey()] = item.getValue()
        }
      }
      return encoded
    },
    setDisabled(state) {
      for (let i = 0; i < this.$children.length; i++) {
        const item = this.$children[i]
        item.setDisabled(state)
      }
    }
  }
}
</script>

<style>
</style>