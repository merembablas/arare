<template>
  <div
    class="
      animate-pulse
      rounded
      bg-gray-100
      w-full
      md:w-64
      md:h-64
      flex flex-col
      justify-top
      shadow-md
      m-1
    "
  >
    <div
      :class="`w-full h-96 md:h-40 rounded-t shadow-inner bg-${bgColor}-100`"
    ></div>
    <div class="pl-2 pr-2 flex justify-between items-center">
      <div>
        <div class="h-5 w-40 bg-gray-400"></div>

        <div class="flex items-start p-2">
          <!-- <div class="w-7 h-7 rounded-full"></div> -->
          <div
            class="creator-name text-green-600 ml-2 h-5 w-10 bg-gray-400"
          ></div>
        </div>

        <div class="h-5 w-20 bg-gray-400"></div>
      </div>
      <div class="h-5 w-40 bg-gray-400"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    bgColor() {
      return ['blue', 'pink', 'green', 'yellow', 'gray', 'purple'][
        Math.floor(Math.random() * 6)
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
