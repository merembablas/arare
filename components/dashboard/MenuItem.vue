<template>
  <div
    :class="`flex cursor-pointer menu-item ${
      active ? 'bg-blue-300 selected' : 'hover:bg-blue-200'
    } p-3 items-center`"
    @click="$emit('click')"
  >
    <div>
      <svg
        v-if="text === 'Dashboard'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        :stroke="active ? 'black' : 'currentColor'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
      <svg
        v-if="text === 'Profile'"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div :class="`ml-2 hidden md:block ${active ? 'text-black' : ''}`">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    active: { type: Boolean, required: true, default: false }
  }
}
</script>

<style scoped>
.menu-item.selected {
  font-family: 'RobotoSlab bold';
}
</style>