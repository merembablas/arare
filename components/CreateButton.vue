<template>
  <div class="flex md:space-x-8">
    <Button
      text="CREATE"
      :icon-mode="true"
      :icon-on-mobile="true"
      @click="$emit('click')"
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
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>