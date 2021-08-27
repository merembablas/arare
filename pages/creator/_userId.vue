<template>
  <div>
    <Navbar />
    <div class="m-10 items-center">
      <div class="relative flex items-top justify-center min-h-screen">
        <div
          class="
            rounded
            bg-gray-300
            w-64
            h-64
            flex
            justify-center
            items-center
            shadow-md
          "
        >
          <div
            class="w-64 h-64 rounded shadow-md"
            :style="`
              background: url(https://picsum.photos/seed/${userId}/400/400) center no-repeat;
            `"
          ></div>
        </div>

        <div class="w-2/4 ml-10">
          <h1 class="font-extrabold text-2xl">Galam Zulkifli</h1>

          <ItemFieldInfo
            a-key="Bio"
            value="Galam is the one of the greatest artist in the world"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.userId
    }
  }
}
</script>


<style lang="less">
</style>