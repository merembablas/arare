<template>
  <div class="w-screen h-80">
    <div
      class="w-full h-full"
      :style="`background: url('${pic}') center no-repeat; background-size: cover;`"
    ></div>
  </div>
</template>

<script>
export default {
  props: { pic: { type: String, required: true } }
}
</script>

<style>
</style>