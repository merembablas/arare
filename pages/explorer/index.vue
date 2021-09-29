<template>
  <div class="p-5 relative w-full md:w-2/3">
    <!-- FEATURED -->
    <div class="flex flex-col">
      <!-- <div class="p-5 rounded-xl w-full h-64 bg-blue-100">
        <h2>Featured</h2>
      </div>

      <div class="p-5 rounded-xl w-full h-64 bg-yellow-100 mt-5">
        <h2>Hot</h2>
      </div> -->

      <div class="p-5 rounded-xl w-full bg-green-100 mt-5">
        <h2>Latest</h2>
        <LoadingBig v-if="!loaded" />
        <div v-else class="justify-start flex flex-wrap min-w-full">
          <ItemListItem v-for="i in items" :key="i.id" :item="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  layout: 'explorer',
  data() {
    return {
      loaded: false,
      balance: '-',
      latestItems: []
    }
  },
  fetchOnServer: false,
  fetchKey: 'dashboardIndex',
  async fetch() {
    this.items = await this.$arare
      .fetchPopularItems()
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
</script>


<style lang="less" scoped>
p {
  color: #6c7080;
}
</style>