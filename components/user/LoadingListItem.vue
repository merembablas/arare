<template>
  <div class="animate-pulse flex justify-center items-center">
    <div
      class="rounded-3xl bg-white w-screen md:w-full h-42 pb-6 pl-5 pr-5 pt-7"
    >
      <div class="flex justify-between">
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="orange"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="ml-2 bg-gray-300 w-10 h-4"></span>
        </div>
        <div
          class="
            w-12
            h-6
            rounded-lg
            bg-blue-700
            flex
            items-center
            justify-between
          "
        ></div>
      </div>
      <div
        class="min-w-full bg-gray-100 mt-5 divider"
        style="height: 2px"
      ></div>
      <div class="flex flex-col items-center pt-5">
        <div
          class="rounded-full w-24 h-24"
          :style="`background-color: ${bgColor}`"
        ></div>
        <div class="font-semibold mt-3 h-6 w-20 bg-gray-400"></div>
        <div class="text-sm w-32 h-4 bg-gray-300"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    bgColor() {
      return ['#ffedd1', '#f6cfff', '#97c78f', '#fffdd6', '#cff8ff', '#e4cfff'][
        Math.floor(Math.random() * 6)
      ]
    }
  },
  methods: {}
}
</script>

<style>
</style>