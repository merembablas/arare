<template>
  <div class="flex flex-col space-y-5">
    <LoadingSmall v-if="!loaded" />
    <div v-if="bids.length > 0">
      <BidListItem
        v-for="bid in bids"
        :id="bid.id"
        :key="bid.id"
        :creator-id="bid.initiatorId"
        :creator-name="bid.initiatorName"
        :time="bid.timestamp"
        :value="bid.value"
        :token-type="bid.tokenType"
      />
    </div>
    <div v-else>No data</div>
  </div>
</template>

<script>
export default {
  props: { item: { type: Object, required: true } },
  data: () => ({
    loaded: false,
    bids: []
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$axios
        .get(`/api/items/${this.item.id}/bids`)
        .then(({ data: { error, result } }) => {
          if (error) {
            console.log(
              '🚀 ~ file: Box.vue ~ line 34 ~ this.$axios.get ~ error',
              error
            )

            return
          }
          this.bids = result
        })
        .finally(() => {
          this.loaded = true
        })
    },
    onNewBid(bid) {
      this.add(bid)
    },
    add(bid) {
      this.bids.unshift(bid)
    }
  }
}
</script>

<style>
</style>