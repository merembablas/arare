<template>
  <div
    class="
      rounded
      w-4/2
      flex flex-grow
      justify-center
      items-center
      md:border-r-2
      pr-2
    "
  >
    <div
      v-if="item"
      class="
        rounded-3xl
        flex flex-col
        items-center
        bg-white
        w-auto
        h-auto
        pb-6
        border-2
        justify-center
      "
    >
      <div
        class="rounded-t-2xl"
        :style="`background: url('${item.pic}') no-repeat center; width: 350px; height: 400px;`"
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