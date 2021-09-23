<template>
  <div>
    <div class="flex flex-wrap mt-5 space-x-10">
      <div
        class="
          flex flex-col
          p-5
          border-2
          rounded-xl
          border-gray-100
          justify-center
          items-center
          cursor-pointer
          hover:bg-blue-100
          hover:border-blue-100
        "
        @click="onItemClick('picture')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#0d67e5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <div>Picture</div>
      </div>
      <div
        class="
          flex flex-col
          p-5
          border-2
          rounded-xl
          border-gray-100
          justify-center
          items-center
          cursor-pointer
          hover:bg-blue-100
          hover:border-blue-100
        "
        @click="onItemClick('file')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#7FE11D"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div>File</div>
      </div>
      <div
        class="
          flex flex-col
          p-5
          border-2
          rounded-xl
          border-gray-100
          justify-center
          items-center
          cursor-pointer
          hover:bg-blue-100
          hover:border-blue-100
        "
        @click="onItemClick('url')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#0d67e5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <div>URL</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onItemClick(type) {
      this.$emit('item-click', type)
    }
  }
}
</script>

<style>
</style>