<template>
  <div>
    <Navbar />
    <div class="m-10 items-center min-h-screen">
      <div class="relative flex items-top justify-center">
        <div
          v-if="creator"
          class="w-64 h-64 rounded shadow-md"
          :style="`
              background: url('${creator.pic}') center no-repeat; background-size: cover;
            `"
        ></div>

        <div class="w-2/4 ml-10">
          <h1 v-if="creator != null" class="font-extrabold text-2xl">
            {{ creator.name }}
          </h1>

          <ItemFieldInfo v-if="creator != null" a-key="Bio">
            <p>{{ creator.biography }}</p>
          </ItemFieldInfo>

          <ItemFieldInfo a-key="Popularity">
            <PopularityMeter :star="3" :total="5" />
          </ItemFieldInfo>
        </div>
      </div>

      <div class="border-b-2 pt-5 border-gray-300"></div>
      <div class="border-t-2 border-gray-200"></div>

      <div
        class="
          flex flex-wrap
          justify-center
          items-center
          pl-20
          pr-20
          items-top
          relative
          mt-5
        "
      >
        <div class="w-64">Collections (120)</div>
        <div class="w-64"></div>
        <div><SearchBox class="border-b-2" /></div>
      </div>

      <!-- collection list -->
      <div
        class="
          collection-list
          relative
          flex flex-wrap
          items-top
          justify-center
          pt-5
          md:p-10
        "
      >
        <ItemListItem v-for="i in items" :key="i.id" :item="i" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      creator: null,
      creatorId: this.$route.params.creatorId
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      this.creator = this.$dummy.generateUser(this.creatorId)
      this.items = this.$dummy.generateItems(20)
    }
  }
}
</script>


<style lang="less">
</style>