<template>
  <client-only>
    <div v-if="isCreator" class="p-2 md:p-10 w-full md:w-2/3">
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
    <div v-else class="p-2 w-full md:w-2/3">
      <div class="flex flex-col h-screen items-center ml-10 pt-2 justify-top">
        <div class="bg-yellow-200 rounded-xl p-10 w-2/3 h-42">
          You are not creator
        </div>
      </div>
    </div>
  </client-only>
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
  computed: {
    isCreator() {
      return this.getCurrentIdentity()?.isCreator
    }
  },
  mounted() {
    this.fetchItemCount()
  },
  methods: {
    ...mapGetters('items', ['getMyItemCount']),
    ...mapGetters('user', ['getCurrentIdentity']),
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

<style lang="less"></style>
