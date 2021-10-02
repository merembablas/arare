<template>
  <div class="p-5 relative w-full md:w-2/3">
    <div class="flex flex-col">
      <div class="rounded-xl w-full">
        <h2>Popular</h2>
        <LoadingBig v-if="!loaded" />
        <div
          v-else
          class="
            justify-start
            flex
            md:flex-row
            min-w-full
            overflow-x-scroll
            h-64
          "
        >
          <ItemListItem v-for="i in items" :key="i.id" :item="i" />
        </div>
      </div>

      <div class="rounded-xl w-full mt-10">
        <h2>Most Valuable</h2>
        <LoadingBig v-if="!loaded" />
        <div
          v-else
          class="
            justify-start
            flex
            md:flex-row
            min-w-full
            overflow-x-scroll
            h-64
          "
        >
          <ItemListItem v-for="i in items" :key="i.id" :item="i" />
        </div>
      </div>

      <div class="rounded-xl w-full mt-10">
        <h2>Latest</h2>
        <LoadingBig v-if="!loaded" />
        <div
          v-else
          class="
            justify-start
            flex
            md:flex-row
            min-w-full
            overflow-x-scroll
            h-64
          "
        >
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