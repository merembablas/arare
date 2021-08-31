<template>
  <div>
    <Navbar />
    <div class="m-10 items-center min-h-screen">
      <div class="relative flex items-top justify-center">
        <div
          class="
            rounded
            bg-gray-300
            w-64
            h-64
            flex
            justify-center
            items-center
            shadow-md
          "
        >
          <div
            class="w-64 h-64 rounded shadow-md"
            :style="`
              background: url(https://picsum.photos/seed/${userId}/400/400) center no-repeat;
            `"
          ></div>
        </div>

        <div class="w-2/4 ml-10">
          <h1 class="font-extrabold text-2xl">{{ user.name }}</h1>

          <ItemFieldInfo
            a-key="Bio"
            value="Galam is the one of the greatest artist in the world"
          />

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
          :name="i.name"
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
      user: {
        name: this.$route.params.userId
      },
      userId: this.$route.params.userId
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    fetchItems() {
      this.items = Array.from(Array(10).keys()).map((i) => {
        return {
          id: i,
          name: 'Lukisan'
        }
      })
    }
  }
}
</script>


<style lang="less">
</style>