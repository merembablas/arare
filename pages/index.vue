<template>
  <div>
    <Navbar />
    <div class="md:m-10">
      <div class="flex flex-wrap justify-center">
        <div class="lg:hidden">
          <img src="/img/arare-front.png" alt="Arare front image" />
        </div>
        <div class="md:pr-10 pl-3 pr-3 pt-5 max-w-md md:max-w-lg w-full">
          <div class="headline">NFT for the Real World</div>
          <p class="pt-5">
            Arare is a NFT Marketplace with real or physical underlying asset.
            All NFT in Arare had physical asset in gallery around the globe.
          </p>
        </div>
        <div class="pl-10 hidden lg:block">
          <img src="/img/arare-front.png" alt="Arare front image" />
        </div>
      </div>
    </div>

    <TopCreators :creators="creators" />

    <PopularItems />

    <Footer />
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