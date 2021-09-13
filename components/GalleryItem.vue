<template>
  <div class="md:w-1/4 m-5">
    <div class="flex flex-col">
      <div class="cursor-pointer">
        <img src="/img/gallery-dummy-main.png" alt="" class="md:rounded-xl" />
      </div>
      <div class="flex pt-1 space-x-1 justify-center cursor-pointer">
        <div>
          <img src="/img/gallery-dummy-a.png" alt="" class="rounded-sm" />
        </div>
        <div>
          <img src="/img/gallery-dummy-b.png" alt="" class="rounded-sm" />
        </div>
        <div>
          <img src="/img/gallery-dummy-c.png" alt="" class="rounded-sm" />
        </div>
      </div>
      <div>
        <div class="text-semibold cursor-pointer hover:text-blue-500">
          Koleksi Langka
        </div>
        <div class="flex">
          <span class="text-sm items-count">22 items</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.items-count {
  font-family: 'Helvetica Neue', Helvetica;
  color: @text-color-2;
  font-weight: 100;
}
</style>