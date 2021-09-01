<template>
  <div class="relative cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0D67E5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
    <div
      v-if="count > 0"
      class="
        rounded-full
        absolute
        bg-red-600
        text-sm
        notif-icon
        top-0
        left-4
        text-white
        pl-2
        pr-2
      "
    >
      {{ count }}
    </div>
  </div>
</template>

<script>
export default {
  props: { count: { type: Number, required: true, default: 0 } }
}
</script>

<style>
</style>