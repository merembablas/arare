<template>
  <div>
    <Navbar />
    <div class="m-10">
      <div class="flex justify-between">
        <div
          class="
            rounded
            bg-gray-300
            w-2/4
            h-screen
            flex flex-grow
            justify-center
            items-center
            shadow-md
          "
        >
          <div
            class="w-2/4 h-3/6 rounded shadow-md"
            :style="`
              background: url(https://picsum.photos/seed/arare${itemId}/400/400) center no-repeat;
            `"
          ></div>
        </div>

        <div class="w-2/4 ml-10">
          <h1 class="font-extrabold text-2xl">
            Lukisan Nusantara - Burung Elang {{ itemId }}
          </h1>
          <div>
            <span
              >by:
              <ClickableName name="Galam Zulkifli" link-to="/creator/galam" />
            </span>
          </div>
          <ItemFieldInfo a-key="Collection" value="Lukisan Nusantara" />
          <ItemFieldInfo a-key="Value" value="30 ARA" extra="(Rp. 18.000,-)" />
          <ItemFieldInfo
            a-key="Current owner"
            value="Gray Zein Syahputra"
            value-type="user"
            link-to="/user/grayzein"
          />
          <ItemFieldInfo
            a-key="Asset location"
            value="ArtJog Gallery Yogyakarta"
            value-type="location"
            link-to="/gallery/artjog"
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

          <ModalPlaceBid v-model="placeBidDialogVisible" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: this.$route.params.itemId,
      placeBidDialogVisible: false
    }
  }
}
</script>


<style lang="less">
</style>