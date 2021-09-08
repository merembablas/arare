<template>
  <a :href="linkTo" :class="`text-${color} font-semibold`">
    <div class="w-32 truncate">{{ name }}</div>
  </a>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    linkTo: { type: String, required: true },
    color: { type: String, default: 'blue-600' }
  }
}
</script>