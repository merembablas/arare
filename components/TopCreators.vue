<template>
  <div class="bg-gray-200 mt-10 p-10 h-auto w-auto min-w-full">
    <div class="text-2xl font-semibold pb-10">Top Creators</div>
    <div class="justify-center flex flex-wrap min-w-full">
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
  props: {
    creators: { type: Array, required: true }
  }
}
</script>

<style>
</style>