<template>
  <div class="p-10 relative w-2/3">
    <Button
      text="Add"
      :icon-mode="true"
      class="w-24 absolute"
      style="right: 55px"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </template>
    </Button>
    <h2>3 Collections</h2>

    <div class="flex flex-wrap mt-10">
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />

      <div class="flex flex-col ml-5 relative"></div>
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
</style>