<template>
  <div
    class="rounded w-4/2 flex flex-grow justify-center items-center border-r-2"
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
        pt-1
        pl-1
        pr-1
        border-2
        justify-center
      "
    >
      <div
        class="rounded-2xl"
        :style="`background: url('${item.pic}') no-repeat center; width: 350px; height: 400px;`"
      ></div>
      <div class="w-full border-b-2 h-1 pt-2"></div>
      <div class="flex w-full pl-5 pr-5 justify-between items-center">
        <div class="flex flex-col items-center pt-4">
          <span class="text-gray-400 text-sm">Creator:</span>
          <div
            class="w-7 h-7 rounded-full mt-2"
            :style="`background: url('${item.creator.pic}') center center / 100% 100% no-repeat;`"
            data-v-6b9a30c2=""
          ></div>
          <div
            class="creator-name text-green-600 ml-2 truncate w-auto"
            data-v-6b9a30c2=""
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
  }
}
</script>

<style>
</style>