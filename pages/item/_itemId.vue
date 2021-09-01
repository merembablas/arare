<template>
  <div>
    <Navbar />
    <div class="m-10">
      <div class="flex h-screen justify-between">
        <div
          class="
            rounded
            w-4/2
            flex flex-grow
            justify-center
            items-center
            border-r-2
          "
        >
          <!-- <div
            v-if="item"
            class="w-2/4 h-3/6 rounded shadow-md"
            :style="`
              background: url('${item.pic}') center no-repeat;
            `"
          ></div> -->

          <!-- item picture -->
          <div
            v-if="item"
            class="
              rounded-3xl
              flex flex-col
              items-center
              bg-white
              w-auto
              h-auto
              pb-6
              pt-1
              pl-1
              pr-1
              border-2
              justify-center
            "
          >
            <div
              class="rounded-2xl"
              :style="`background: url(https://picsum.photos/seed/arare6/400/400) no-repeat center; width: 350px; height: 400px;`"
            ></div>
            <div class="w-full border-b-2 h-1 pt-2"></div>
            <div class="flex flex-col items-center pt-4">
              <span class="text-gray-400 text-sm">Creator:</span>
              <div
                class="w-7 h-7 rounded-full mt-2"
                :style="`background: url('${item.creator.pic}') center center / 100% 100% no-repeat;`"
                data-v-6b9a30c2=""
              ></div>
              <div
                class="creator-name text-green-600 ml-2 truncate w-auto"
                data-v-6b9a30c2=""
              >
                {{ item.creator.name }}
              </div>
            </div>
          </div>
          <!-- eof item picture -->
        </div>

        <div class="w-2/4 ml-10">
          <h1 v-if="item" class="font-extrabold text-3xl">{{ item.name }}</h1>
          <div class="flex items-center">
            <div class="text-biru-2 text-sm">This item has been verified</div>
            <IconVerified class="ml-1" />
          </div>
          <div v-if="item">
            <ItemFieldInfo a-key="by">
              <ClickableName
                :name="item.creator.name"
                :link-to="`/creator/${item.creator.id}`"
              />
            </ItemFieldInfo>
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

          <ModalPlaceBid v-model="placeBidDialogVisible" :item="item" />

          <!-- TABS -->
          <Tab
            :items="['History', 'Ownership', 'Bids', 'Comments']"
            :active="0"
          />
          <div class="history flex flex-col pt-10">
            <ItemHistoryListItem :ping="true" :active="true" />
            <ItemHistoryListItem />
            <ItemHistoryListItem />
          </div>
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
      item: null,
      name: '',
      placeBidDialogVisible: false
    }
  },
  fetch() {
    this.name = `Lukisan #${this.itemId}`
    this.item = this.$dummy.generateItem(this.itemId)
  }
}
</script>


<style lang="less">
</style>