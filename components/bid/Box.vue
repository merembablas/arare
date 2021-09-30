<template>
  <div class="flex flex-col space-y-5">
    <LoadingSmall v-if="!loaded" />
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
</template>

<script>
export default {
  props: { item: { type: Object, required: true } },
  data: () => ({
    loaded: false,
    bids: []
  }),
  mounted() {
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
  methods: {
    onNewBid(bid) {
      this.bids.push(bid)
    }
  }
}
</script>

<style>
</style>