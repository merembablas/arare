<template>
  <div class="p-2 md:p-5 relative w-full md:w-2/3">
    <h1>Most Valuable NFTs!</h1>

    <div class="mt-5">
      <div v-if="!loaded" class="justify-start flex flex-wrap min-w-full">
        <ItemLoadingListItem v-for="i in 6" :key="i" />
      </div>
      <div v-else class="justify-start flex flex-wrap min-w-full">
        <ItemListItem v-for="i in items" :key="i.id" :item="i" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'explorer',
  data() {
    return {
      loaded: false,
      items: []
    }
  },
  async mounted() {
    await this.fetchMostValuedItems()
  },
  methods: {
    async fetchMostValuedItems() {
      this.items = await this.$arare
        .fetchMostValuedItems()
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          return result
        })
      this.loaded = true
    }
  }
}
</script>


<style lang="less" scoped>
p {
  color: #6c7080;
}
</style>