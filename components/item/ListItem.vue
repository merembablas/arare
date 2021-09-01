<template>
  <div
    class="
      rounded
      bg-gray-100
      w-64
      h-64
      flex flex-col
      justify-top
      shadow-md
      m-1
      cursor-pointer
    "
    @click="onClick"
  >
    <div
      class="m-2 h-40 rounded shadow-inner bg-pink-100"
      :style="`
              background: url(https://picsum.photos/seed/arare${item.id}/400/400) center no-repeat;
            `"
    ></div>
    <div class="pl-2 pr-2 flex justify-between items-center">
      <div>
        <div class="h-6 w-40 truncate">{{ item.name }}</div>

        <div class="flex items-center">
          <div
            class="w-7 h-7 rounded-full"
            :style="`
              background: url('${item.creator.pic}') no-repeat center; background-size: 100% 100%;
            `"
          ></div>
          <div class="creator-name text-green-600 ml-2 truncate w-40">
            {{ item.creator.name }}
          </div>
        </div>

        <PopularityMeter class="pt-2 pb-2" :star="3" :total="5" size="4" />
      </div>
      <div class="font-semibold">30 ARA</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  methods: {
    onClick() {
      this.$router.push(`/item/${this.item.id}`)
    }
  }
}
</script>

<style scoped>
.creator-name {
  font-size: 12px !important;
}
</style>