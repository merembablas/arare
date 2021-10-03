<template>
  <div class="p-2 md:p-10 w-full md:w-2/3">
    <!-- <Button
      text="Add"
      :icon-mode="true"
      class="w-24 absolute"
      style="right: 40px"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </template>
    </Button> -->
    <h2>Items: {{ ownedItemCount }}</h2>
    <DashboardItemsTable />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  data() {
    return {
      ownedItemCount: this.getMyItemCount()
    }
  },
  mounted() {
    this.fetchItemCount()
  },
  methods: {
    ...mapGetters('items', ['getMyItemCount']),
    fetchItemCount() {
      this.$axios
        .get('/api/stats/created-count')
        .then(({ data: { error, result } }) => {
          if (error) {
            alert(error)
            return
          }
          this.ownedItemCount = result
        })
    }
  }
}
</script>


<style lang="less">
</style>