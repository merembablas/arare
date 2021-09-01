<template>
  <div class="p-10 h-auto w-auto min-w-full">
    <div class="text-2xl font-semibold pb-10">Popular Items</div>
    <div class="justify-center flex flex-wrap min-w-full">
      <ItemListItem
        v-for="i in items"
        :id="`${i.id}`"
        :key="i.id"
        :name="i.name"
        :creator="i.creator"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: this.$dummy.generateItems(5)
    }
  }
}
</script>

<style>
</style>