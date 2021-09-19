<template>
  <div class="form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('form childrens:', this.$children)
  },
  methods: {
    toJSON() {
      const encoded = {}
      for (let i = 0; i < this.$children.length; i++) {
        const item = this.$children[i]
        if (item.getValue) {
          encoded[item.getKey()] = item.getValue()
        }
      }
      return encoded
    }
  }
}
</script>

<style>
</style>