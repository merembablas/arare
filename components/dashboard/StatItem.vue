<template>
  <div
    class="
      flex flex-col
      justify-center
      text-center
      p-10
      stat-item
      counter
      rounded-xl
    "
  >
    <div>{{ name }}</div>
    <div class="text-semibold">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    value: { type: String, required: true }
  }
}
</script>

<style lang="less">
.stat-item {
  background-color: @bg-color-1;

  .text-semibold {
    font-family: 'RobotoSlab bold', Helvetica, sans-serif;
    color: green;
    font-size: 1.2em;
  }
}
</style>