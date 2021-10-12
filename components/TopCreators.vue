<template>
  <div class="bg-gray-200 mt-10 p-10 h-auto w-auto min-w-full">
    <div class="text-2xl font-semibold pb-10">Top Creators</div>
    <div v-if="!loaded" class="justify-center flex flex-wrap min-w-full">
      <UserLoadingListItem v-for="i in 5" :key="i" class="ml-2 mr-2 mt-2" />
    </div>
    <div v-else class="justify-center flex flex-wrap min-w-full">
      <UserListItem
        v-for="creator in creators"
        :id="creator.id.toString()"
        :key="creator.id"
        class="ml-2 mr-2 mt-2"
        :name="creator.name"
        :stars="creator.stars"
        :rank="creator.rank"
        :collections="creator.collections"
        :pic="creator.pic"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      creators: []
    }
  },
  mounted() {
    this.$arare.fetchPopularCreators(0, 5).then(({ data }) => {
      this.creators = data.result
      this.loaded = true
    })
  }
}
</script>

<style>
</style>