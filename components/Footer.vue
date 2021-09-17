<template>
  <div
    class="
      bg-white
      pb-10
      flex flex-auto
      pt-5
      border-t-2
      justify-between
      items-end
    "
  >
    <div class="m-10 footer flex flex-col w-64">
      <div class="flex items-center">
        <Logo width="32" height="32" />
        <div class="ml-2 font-semibold text-3xl">arare</div>
      </div>
      <div>NFT for the Real World</div>
      <div></div>
      <div>Copyright &copy; <a href="http://arare.one">arare.one</a></div>
    </div>
    <div class="m-10 footer flex flex-wrap items-center justify-center w-64">
      <div>Powered by</div>
      <a class="ml-2" href="https://nuchain.network" target="_blank"> </a>
      <img
        :src="require('~/assets/img/logo-nuchain.svg')"
        alt=""
        style="width: 100px"
      />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>