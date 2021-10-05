<template>
  <div class="p-5 relative w-full md:w-full justify-center">
    <div>
      <div class="rounded-xl w-full items-center text-center">
        <h2>300 items found for "{{ query }}"</h2>
        <LoadingBig v-if="!loaded" />
        <div v-else class="justify-center flex flex-wrap min-w-full">
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
  layout: 'search',
  data() {
    return {
      loaded: false,
      balance: '-',
      items: [],
      query: this.$route.query.q
    }
  },
  fetchOnServer: false,
  fetchKey: 'dashboardIndex',
  async fetch() {
    this.items = await this.$axios
      .get(`/api/search/items?q=${this.query}`)
      .then(({ data: { error, result } }) => {
        if (error) {
          alert(error)
          return
        }
        return result
      })
    this.loaded = true
  },
  watch: {
    '$store.state.search.currentQuery'(query) {
      this.query = query
    },
    '$store.state.search.searchResult'(items) {
      this.items = items
    }
  }
}
</script>


<style lang="less" scoped>
p {
  color: #6c7080;
}
</style>
