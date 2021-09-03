<template>
  <div
    class="
      rounded
      flex flex-grow
      justify-center
      items-center
      md:border-r-2
      md:pr-2
      w-1/3
    "
  >
    <div
      v-if="item"
      class="
        md:rounded-3xl
        flex flex-col
        items-center
        bg-white
        w-screen
        md:w-auto
        h-auto
        pb-6
        border-2
        justify-center
      "
    >
      <div
        class="md:rounded-t-2xl w-screen md:w-96 h-96"
        :style="`background: url('${item.pic}') no-repeat center; background-size: cover`"
      ></div>
      <div class="flex w-full pl-5 pr-5 justify-between items-center">
        <div class="flex flex-col items-center pt-4">
          <span class="text-gray-400 text-sm">Creator:</span>
          <div
            class="w-7 h-7 rounded-full mt-2 cursor-pointer"
            :style="`background: url('${item.creator.pic}') center center / 100% 100% no-repeat;`"
            @click="onCreatorClick"
          ></div>
          <div
            class="
              creator-name
              text-green-600
              ml-2
              truncate
              w-auto
              cursor-pointer
              text-sm
            "
            @click="onCreatorClick"
          >
            {{ item.creator.name }}
          </div>
        </div>
        <div class="flex flex-col items-center pt-4">
          <div class="text-gray-400 text-sm">Value:</div>
          <div>30 ARA</div>
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
      this.$router.push(`/creator/${this.item.creator.id}`)
    }
  }
}
</script>

<style>
</style>