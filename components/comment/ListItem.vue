<template>
  <div class="flex flex-row">
    <div class="creator flex flex-col items-center">
      <div
        class="w-7 h-7 rounded-full mt-2 cursor-pointer"
        :style="`background: url('${creatorPic}') center center / cover no-repeat;`"
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
        :title="creatorName"
        @click="onCreatorClick"
      >
        {{ creatorName }}
      </div>
    </div>
    <div class="message-body flex flex-col p-5 relative w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-400 absolute"
        fill="white"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style="left: -16px; top: 0px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 19l-7-7 7-7"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <small class="text-gray-400">{{ $moment(time).fromNow() }}</small>
      <div class="message">
        <p>
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorPic: { type: String, required: true },
    time: { type: Number, required: true },
    message: { type: String, required: true }
  },
  methods: {
    onCreatorClick() {
      this.$router.push(`/user/${this.item.creator.id}`)
    }
  }
}
</script>

<style lang="less">
.message-body {
  border: 1px solid #cacaca;
}
</style>