<template>
  <div>
    <Navbar />
    <div
      v-if="!user"
      class="w-screen h-80 bg-gray-100 loading placeholder"
    ></div>
    <UserCover v-if="user" :pic="user.coverPic" />

    <div class="flex items-top justify-center" style="margin-top: -8em">
      <div
        v-if="user"
        class="w-64 h-64 rounded-full shadow-xl border-white border-2"
        :style="`
              background: url('${user.pic}') center no-repeat; background-size: cover;
            `"
      ></div>
      <div
        v-if="!user"
        class="
          w-64
          h-64
          rounded-full
          shadow-xl
          border-white border-2
          bg-gray-100
          loading
          placeholder
          items-center
          justify-center
          flex
        "
      >
        <div
          class="
            w-60
            h-60
            rounded-full
            loading
            placeholder
            bg-gray-300
            animate-pulse
          "
        ></div>
      </div>
    </div>

    <div class="md:m-10 items-center min-h-screen">
      <div class="relative flex items-top justify-center text-center">
        <div class="w-full pl-3 pr-3 md:w-2/4 items-center flex flex-col">
          <h1 v-if="user != null" class="font-extrabold text-2xl">
            {{ user.name }}
          </h1>
          <div
            v-else
            class="
              font-extrabold
              text-2xl
              bg-gray-400
              animate-pulse
              w-44
              items-center
              justify-center
            "
          >
            &nbsp;
          </div>
          <small v-if="user.isCreator" class="text-green-600">CREATOR</small>

          <ItemFieldInfo v-if="user != null" a-key="Bio">
            <p>{{ user.biography }}</p>
          </ItemFieldInfo>

          <div class="flex flex-row items-center justify-center space-x-10">
            <ItemFieldInfo a-key="Popularity">
              <PopularityMeter :star="3" :total="5" />
            </ItemFieldInfo>
            <ItemFieldInfo a-key="Address">
              <client-only>
                <NuchainAddress :address="user.primaryAddress" />
              </client-only>
            </ItemFieldInfo>
          </div>
        </div>
      </div>

      <div
        v-if="user && user.twitter"
        class="flex items-center justify-center mt-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#0D67E5"
          class="h-6 w-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
          />
        </svg>
        <div class="ml-2">
          <a :href="`https://twitter.com/${user.twitter}`" target="_blank"
            >@{{ user.twitter }}</a
          >
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
    <Footer />
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const user = await $axios
      .get(`/api/accounts/${params.userId}`)
      .then(({ data: { error, result } }) => {
        if (error) {
          alert(error)
          return
        }
        return result
      })
    const items = await $axios
      .get(`/api/accounts/${params.userId}/items`)
      .then(({ data: { error, result } }) => {
        if (error) {
          return
        }
        return result
      })
    console.log('🚀 ~ file: _userId.vue ~ line 154 ~ asyncData ~ user', user)
    return {
      items,
      user,
      userId: params.userId
    }
  }
  //   mounted() {
  //     this.fetchItems()
  //   },
  //   methods: {
  //     fetchItems() {
  //       this.user = this.$dummy.generateUser(this.userId)
  //       this.items = this.$dummy.generateItems(20)
  //     }
  //   }
}
</script>


<style lang="less">
</style>