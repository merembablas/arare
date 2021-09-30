<template>
  <div
    class="
      rounded
      bg-gray-100
      w-full
      md:w-64
      md:h-64
      flex flex-col
      justify-top
      shadow-md
      m-1
      cursor-pointer
    "
    @click="onClick"
  >
    <div
      class="w-full h-96 md:h-40 rounded-t shadow-inner bg-pink-100"
      :style="`
              background: url(${item.pic}) center no-repeat; background-size: cover;
            `"
    ></div>
    <div class="pl-2 pr-2 flex justify-between items-center">
      <div>
        <div class="h-6 w-40 truncate">{{ item.name }}</div>

        <div class="flex items-center">
          <div
            class="w-7 h-7 rounded-full"
            :style="`
              background: url('${item.creator.pic}') no-repeat center; background-size: cover;
            `"
          ></div>
          <div class="creator-name text-green-600 ml-2 truncate w-40">
            {{ item.creator.name }}
          </div>
        </div>

        <PopularityMeter class="pt-2 pb-2" :star="3" :total="5" size="4" />
      </div>
      <div class="font-semibold">{{ item.value }} ARA</div>
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
      this.$router.push(`/items/${this.item.hash}`)
    }
  }
}
</script>

<style scoped>
.creator-name {
  font-size: 12px !important;
}
</style>