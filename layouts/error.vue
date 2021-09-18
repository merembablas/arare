<template>
  <div>
    <Navbar />
    <div class="md:m-10">
      <div class="flex justify-center">
        <div class="flex flex-col items-center justify-center text-center">
          <div v-if="error.statusCode === 404">
            <h1>Oops! 404</h1>
            <p>The page you are looking for is not exists</p>
          </div>
          <h1 v-else>An error occurred</h1>

          <div class="p-3 rounded-xl border-2 mt-10">
            <NuxtLink to="/">Back to Home</NuxtLink>
          </div>
        </div>

        <div class="flex flex-col">
          <img
            :src="require('~/static/img/404-not-found.png')"
            alt="Not found image"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: { error: { type: Object, required: true } }
}
</script>
