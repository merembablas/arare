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
          <div class="pt-5">
            <p>
              Make your digital artworks a valuable assets through the power of
              blockchain.
            </p>
          </div>
        </div>
        <div class="pl-10 hidden lg:block">
          <img src="/img/arare-front.png" alt="Arare front image" />
        </div>
      </div>
    </div>

    <TopCreators />

    <PopularItems />

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>


<style lang="less" scoped>
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