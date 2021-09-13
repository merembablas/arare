<template>
  <div
    class="
      flex flex-col
      w-64
      min-h-screen
      items-top
      justify-start
      dashboard-sidebar
    "
  >
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
    <DashboardMenuItem
      text="Collection"
      :active="isActive('dashboard/collection')"
      @click="$router.push('/dashboard/collection')"
    />
    <DashboardMenuItem
      text="Items"
      :active="isActive('dashboard/items')"
      @click="$router.push('/dashboard/items')"
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

<style lang="less" scoped>
@bg-color-1: #f6f7fc;
.dashboard-sidebar {
  background-color: @bg-color-1;
}
</style>