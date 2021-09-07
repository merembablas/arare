<template>
  <div>
    <Navbar />
    <div class="md:m-10 items-center min-h-screen">
      <div class="relative flex items-top justify-center">
        <div
          v-if="user"
          class="w-64 h-64 rounded shadow-md"
          :style="`
              background: url('${user.pic}') center no-repeat; background-size: cover;
            `"
        ></div>

        <div class="w-2/4 ml-10">
          <h1 v-if="user != null" class="font-extrabold text-2xl">
            {{ user.name }}
          </h1>

          <ItemFieldInfo v-if="user != null" a-key="Bio">
            <p>{{ user.biography }}</p>
          </ItemFieldInfo>

          <ItemFieldInfo a-key="Popularity">
            <PopularityMeter :star="3" :total="5" />
          </ItemFieldInfo>
        </div>
      </div>

      <div class="border-b-2 pt-5 border-gray-300"></div>
      <div class="border-t-2 border-gray-200"></div>

      <div
        class="flex flex-row justify-center pl-20 pr-20 items-top relative mt-5"
      >
        <div class="w-64">Collections (120)</div>
        <div class="w-64"></div>
        <div><SearchBox class="border-b-2" /></div>
      </div>

      <!-- collection list -->
      <div
        v-if="items"
        class="
          collection-list
          relative
          flex flex-wrap
          items-top
          justify-center
          pt-5
        "
      >
        <ItemListItem
          v-for="i in items"
          :id="`${i.id}`"
          :key="i.id"
          :item="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      user: null,
      userId: this.$route.params.userId
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      this.user = this.$dummy.generateUser(this.$route.params.userId)
      this.items = this.$dummy.generateItems(20)
    }
  }
}
</script>


<style lang="less">
</style>