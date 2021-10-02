<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    fill="none"
    viewBox="0 0 24 24"
    :stroke="color"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'currentColor' },
    size: { type: String, default: '15px' }
  }
}
</script>
