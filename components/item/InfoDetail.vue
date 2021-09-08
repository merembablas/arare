<template>
  <div class="md:w-2/4 md:ml-10">
    <div class="pl-2 pr-2">
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
        a-key="Owner"
        :value="item.owner.name"
        value-type="user"
        :link-to="`/user/${item.owner.id}`"
      />
      <ItemFieldInfo
        a-key="Asset location"
        value="Artamedia Gallery Yogyakarta"
        value-type="location"
        link-to="/gallery/artamedia"
      />
      <ItemFieldInfo a-key="Popularity">
        <PopularityMeter :star="3" :total="5" />
      </ItemFieldInfo>

      <div class="mt-10">
        <Button
          text="Place Bid"
          :icon-mode="true"
          @click="placeBidDialogVisible = !placeBidDialogVisible"
        >
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

      <ModalPlaceBid v-model="placeBidDialogVisible" :item="item" />
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
    <div v-show="currentTab == 'Ownership'" class="p-5">Ownership</div>
    <div v-show="currentTab == 'Bids'" class="p-5">Bids</div>
    <div v-show="currentTab == 'Comments'" class="p-5">Comments</div>
  </div>
</template>

<script>
export default {
  props: { item: { type: Object, required: true } },
  data() {
    return {
      placeBidDialogVisible: false,
      currentTab: 'History'
    }
  }
}
</script>

<style>
</style>