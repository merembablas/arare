<template>
  <div class="p-10">
    <div class="flex">
      <div class="flex flex-col">
        <img
          src="https://www.thispersondoesnotexist.com/image"
          alt="dummy"
          class="w-64 h-64 rounded-xl"
        />
        <Button text="Change Photo" class="mt-5" />
      </div>

      <div class="flex flex-col ml-5 relative">
        <Button
          text="Edit"
          :icon-mode="true"
          class="w-24 absolute"
          style="right: 10px"
        >
          <template #icon>
            <IconEditPencil />
          </template>
        </Button>
        <ItemFieldInfo a-key="Full name" value="Ara Syailendra" />
        <ItemFieldInfo
          a-key="Bio"
          value="Creator of minimalistic bold graphic and digital artwork. ✹ Artist / Creative Director ✹ #NFT minting "
        />
        <ItemFieldInfo a-key="Address">
          <NuchainAddress
            address="5E5AsQiCsgubinh7DzzzS4LBbtv9H3NvZep7mk1Li3uNNvie"
            :truncate="false"
          />
        </ItemFieldInfo>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      creators: this.$dummy.generateUsers(5)
    }
  }
}
</script>


<style lang="less">
.headline {
  font-family: 'RobotoSlab bold', Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #0d67e5;
  line-height: 1em;
}
p {
  color: #6c7080;
  font-size: 1.7em;
  font-weight: bold;
}
</style>