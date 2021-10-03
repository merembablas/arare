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

          <ItemFieldInfo v-if="user != null" a-key="Bio" class="w-full">
            <p class="p-2 bg-gray-a rounded w-full">{{ user.bio }}</p>
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
        <IconTwitter size="22px" />

        <div v-if="user.twitter" class="ml-2">
          <a
            class="link-color"
            :href="`https://twitter.com/${user.twitter}`"
            target="_blank"
            >@{{ user.twitter }}</a
          >
        </div>
      </div>

      <div
        v-if="user && user.instagram"
        class="flex items-center justify-center mt-2"
      >
        <IconInstagram size="22px" />
        <div v-if="user.instagram" class="ml-2">
          <a
            class="link-color"
            :href="`https://instagram.com/${user.instagram}`"
            target="_blank"
            >@{{ user.instagram }}</a
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