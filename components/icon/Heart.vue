<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    :fill="theColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.9999 1.80682C17.1022 -4.46593 32.3592 6.5107 10.9999 20.6251C-10.3593 6.51207 4.8977 -4.46593 10.9999 1.80682Z"
      :fill="theColor"
    />
  </svg>
</template>

<script>
export default {
  props: { color: { type: String, default: '#D4D6DF' } },
  data() {
    return {
      theColor: this.color
    }
  },
  watch: {
    color(newValue) {
      this.theColor = newValue
    }
  }
}
</script>