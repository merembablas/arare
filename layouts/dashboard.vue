<template>
  <div>
    <Navbar />
    <div class="flex">
      <DashboardSidebar class="w-auto md:w-64" />
      <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<style lang="less">
h2 {
  color: @brand-color-blue;
  font-size: 1.2em;
}
</style>