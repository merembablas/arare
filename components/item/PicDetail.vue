<template>
  <div class="flex flex-grow justify-center items-center w-full">
    <div
      v-if="item"
      class="
        flex flex-col
        items-center
        bg-white
        w-screen
        h-auto
        pb-6
        border-2
        justify-center
      "
    >
      <div
        class="w-screen md:w-full h-96"
        :style="`background: url('${item.pic}') no-repeat center; background-size: cover`"
      ></div>
      <div class="flex w-full pl-5 pr-5 justify-between items-center">
        <div class="flex flex-col items-center pt-4">
          <span class="text-gray-400 text-sm">Creator:</span>
          <div
            class="w-7 h-7 rounded-full mt-2 cursor-pointer"
            :style="`background: url('${item.creator.pic}') center center / cover no-repeat;`"
            @click="onCreatorClick"
          ></div>
          <div
            class="
              creator-name
              text-green-600
              ml-2
              truncate
              cursor-pointer
              justify-center
              text-center text-sm
              w-32
              font-semibold
            "
            :title="item.creator.name"
            @click="onCreatorClick"
          >
            {{ item.creator.name }}
          </div>
        </div>
        <div class="flex items-center pt-4">
          <div class="flex items-center">
            <IconShare />
            <div class="ml-2">Share</div>
          </div>
          <div class="flex items-center pl-5">
            <IconHeart />
            <div class="ml-2">3515</div>
          </div>
        </div>
      </div>
    </div>
    <!-- eof item picture -->
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  },
  methods: {
    onCreatorClick() {
      this.$router.push(`/user/${this.item.creator.id}`)
    }
  }
}
</script>

<style>
</style>