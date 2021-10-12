<template>
  <div class="md:p-10 p-1 h-auto w-auto min-w-full">
    <div class="text-2xl font-semibold pb-10">Popular Items</div>
    <div
      v-if="$fetchState.pending"
      class="justify-center flex flex-wrap min-w-full"
    >
      <ItemLoadingListItem v-for="i in 5" :key="i" />
    </div>
    <div v-else class="justify-center flex flex-wrap min-w-full">
      <ItemListItem v-for="i in items" :key="i.id" :item="i" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  fetchOnServer: false,
  fetchKey: 'popularItems',
  async fetch() {
    this.items = await this.$arare
      .fetchPopularItems()
      .then(({ data: { error, result } }) => {
        console.log(
          '🚀 ~ file: PopularItems.vue ~ line 19 ~ this.$arare.fetchPopularItems ~ result',
          result
        )
        if (error) {
          alert(error)
          return
        }
        return result
      })
  }
}
</script>

<style>
</style>