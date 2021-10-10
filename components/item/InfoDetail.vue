<template>
  <div class="md:w-2/4 md:ml-10">
    <div v-if="item" class="pl-2 pr-2">
      <div class="hidden md:block">
        <h1 v-if="item" class="font-extrabold text-3xl">
          {{ item.name }}
        </h1>
        <div class="flex items-center">
          <div class="text-color-2 text-sm">This item has been verified</div>
          <IconVerified class="ml-1" />
        </div>
      </div>

      <ItemFieldInfo
        ref="itemValue"
        a-key="Value"
        :value="`${itemValue} ARA`"
      />

      <ItemFieldInfo
        a-key="Owner"
        :value="item.creator.name"
        value-type="user"
        :link-to="`/user/${item.creator.id}`"
      />
      <!-- <ItemFieldInfo
        a-key="Asset location"
        value="Artamedia Gallery Yogyakarta"
        value-type="location"
        :link-to="`/gallery/${item.creator.id}`"
      /> -->
      <ItemFieldInfo a-key="Popularity">
        <PopularityMeter :star="3" :total="5" />
      </ItemFieldInfo>

      <div v-if="item.hasPhysicalAsset" class="mt-5 flex flex-row space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <div>this item has physical asset</div>
      </div>

      <div v-if="!isCreatedByCurrentUser" class="mt-10">
        <Button text="Place Bid" :icon-mode="true" @click="btnPlaceBidClicked">
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
              />
            </svg>
          </template>
        </Button>
      </div>

      <ModalPlaceBid
        v-model="placeBidDialogVisible"
        :item="item"
        @bidPlaced="onBidPlaced"
      />
    </div>

    <!-- TABS -->
    <Tab
      v-model="currentTab"
      :items="['History', 'Ownership', 'Bids', 'Comments']"
      :active="0"
    />
    <ItemTabContentHistory
      v-if="item"
      v-show="currentTab == 'History'"
      :item="item"
    />
    <div v-show="currentTab == 'Ownership'" class="p-5">No data</div>
    <div v-show="currentTab == 'Bids'" class="p-5">
      <LazyBidBox v-if="currentTab == 'Bids'" ref="bidBox" :item="item" />
    </div>
    <div v-show="currentTab == 'Comments'" class="p-5">
      <LazyCommentBox v-if="currentTab == 'Comments'" :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: { item: { type: Object, required: true } },
  data() {
    return {
      placeBidDialogVisible: false,
      currentTab: 'History',
      itemValue: this.item.value
    }
  },
  computed: {
    isCreatedByCurrentUser() {
      return this.getCurrentIdentity()?.id === this.item.creator.id
    }
  },
  methods: {
    ...mapGetters('user', ['getCurrentIdentity']),
    onBidPlaced(bid) {
      if (this.currentTab !== 'Bids') {
        this.currentTab = 'Bids'
      } else {
        setTimeout(() => this.$refs.bidBox.add(bid), 500)
      }
      this.$refs.itemValue.theValue = `${bid.value} ARA`
    },
    btnPlaceBidClicked() {
      if (!this.getCurrentIdentity()) {
        alert(
          'Please set the identity in dashboard > profile first for bidding'
        )
        this.$router.push('/dashboard/profile')
        return
      }
      this.placeBidDialogVisible = !this.placeBidDialogVisible
    }
  }
}
</script>

<style></style>
