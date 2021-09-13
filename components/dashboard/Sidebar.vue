<template>
  <div class="flex flex-col h-screen items-top justify-start bg-blue-100">
    <DashboardMenuItem
      text="Dashboard"
      :active="isActive('dashboard')"
      @click="$router.push('/dashboard')"
    />
    <DashboardMenuItem
      text="Profile"
      :active="isActive('dashboard/profile')"
      @click="$router.push('/dashboard/profile')"
    />
  </div>
</template>

<script>
export default {
  methods: {
    isActive(path) {
      return this.$route.path === `/${path}` || this.$route.path === `/${path}/`
    }
  }
}
</script>

<style>
</style>