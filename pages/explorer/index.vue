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
          <ItemListItem v-for="i in popularItems" :key="i.id" :item="i" />
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
          <ItemListItem v-for="i in mostValuedItems" :key="i.id" :item="i" />
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
          <ItemListItem v-for="i in latestItems" :key="i.id" :item="i" />
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
      popularItems: [],
      mostValuedItems: [],
      latestItems: []
    }
  },
  fetchOnServer: false,
  fetchKey: 'dashboardIndex',
  async fetch() {
    await this.fetchPopularItems()
    await this.fetchMostValuedItems()
    await this.fetchLatestItems()
  },
  methods: {
    async fetchPopularItems() {
      this.popularItems = await this.$arare
        .fetchPopularItems()
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          return result
        })
      this.loaded = true
    },
    async fetchMostValuedItems() {
      this.mostValuedItems = await this.$arare
        .fetchMostValuedItems()
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          return result
        })
      this.loaded = true
    },
    async fetchLatestItems() {
      this.latestItems = await this.$arare
        .fetchLatestItems()
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