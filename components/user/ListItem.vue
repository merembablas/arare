<template>
  <div class="flex justify-center items-center">
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
          <span class="ml-2">{{ stars }}</span>
        </div>
        <div
          class="
            rounded-lg
            bg-blue-700
            flex
            items-center
            justify-between
            text-white
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="p-1 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
            />
          </svg>
          <span class="pr-2 truncate" style="max-width: 40px">#{{ rank }}</span>
        </div>
      </div>
      <div
        class="min-w-full bg-gray-100 mt-5 divider"
        style="height: 2px"
      ></div>
      <div class="flex flex-col items-center pt-5">
        <div
          class="rounded-full w-24 h-24 cursor-pointer"
          :style="`background: url(${pic}) no-repeat center; background-size: 96px 96px;`"
          @click="onClick"
        ></div>
        <div
          class="
            font-semibold
            mt-3
            h-6
            w-32
            text-center
            truncate
            cursor-pointer
          "
          @click="onClick"
        >
          {{ name }}
        </div>
        <div class="text-sm text-gray-400">{{ collections }} Collections</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    stars: { type: Number, default: 0 },
    rank: { type: Number, default: 1000 },
    collections: { type: Number, default: 32 },
    pic: { type: String, required: true }
  },
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$router.push(`/user/${this.id}`)
    }
  }
}
</script>

<style>
</style>