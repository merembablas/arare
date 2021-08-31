<template>
  <div>
    <Navbar />
    <div class="m-10">
      <div class="flex justify-between">
        <div
          class="
            rounded
            bg-gray-300
            w-2/4
            h-screen
            flex flex-grow
            justify-center
            items-center
            shadow-md
          "
        >
          <div
            class="w-2/4 h-screen rounded"
            style="
              background: url(https://picsum.photos/seed/anvie/400/400) center
                no-repeat;
            "
          ></div>
        </div>

        <div class="w-2/4 ml-10">
          <h1 class="font-extrabold text-2xl">
            Lukisan Nusantara - Ombak Selatan
          </h1>
          <div>
            <span
              >by:
              <ClickableName name="Galam Zulkifli" link-to="/creator/galam" />
            </span>
          </div>
          <div class="mt-5">
            <div>Collection:</div>
            <div class="font-semibold pl-5">Lukisan Nusantara</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>


<style lang="less">
</style>