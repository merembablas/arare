<template>
  <div class="flex flex-col">
    <div class="flex items-center space-x-2">
      <IconAra />
      <div>{{ value }}</div>
      <div>{{ tokenType }}</div>
    </div>

    <div class="flex space-x-2 pl-7 text-gray-300 items-center">
      <small
        >by
        <NuxtLink class="link-color" :to="`/user/${creatorId}`">{{
          creatorName
        }}</NuxtLink></small
      >
      <div>-</div>
      <div class="flex justify-start items-center space-x-1 text-gray-300">
        <IconClock size="15px" />
        <small>{{ $moment(time).fromNow() }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorId: { type: String, required: true },
    time: { type: Number, required: true },
    value: { type: Number, required: true },
    tokenType: { type: String, required: true }
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