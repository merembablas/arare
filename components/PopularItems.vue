<template>
  <div class="md:p-10 p-1 h-auto w-auto min-w-full">
    <div class="text-2xl font-semibold pb-10">Popular Items</div>
    <div class="justify-center flex flex-wrap min-w-full">
      <ItemListItem v-for="i in items" :key="i.id" :item="i" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: this.$dummy.generateItems(8)
    }
  }
}
</script>

<style>
</style>