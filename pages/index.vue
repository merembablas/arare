<template>
  <div>
    <Navbar />
    <div class="m-10">
      <div class="flex flex-auto justify-center">
        <div class="pr-10 max-w-sm">
          <div class="headline">NFT for the Real World</div>
          <p class="pt-5">
            Arare is a NFT Marketplace with real or physical underlying asset.
            All NFT in Arare had physical asset in gallery around the globe.
          </p>
        </div>
        <div class="pl-10">
          <img src="/img/arare-front.png" alt="Arare front image" />
        </div>
      </div>
    </div>

    <div class="bg-gray-200 mt-10 p-10 h-auto w-auto min-w-full">
      <div class="text-2xl font-semibold pb-10">Top Creators</div>
      <div class="justify-center flex flex-wrap min-w-full">
        <UserListItem
          v-for="creator in creators"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      creators: this.$dummy.generateUsers(5)
    }
  }
}
</script>


<style lang="less">
.headline {
  font-family: Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #0d67e5;
  line-height: 1em;
}
p {
  color: #777d90;
}
</style>