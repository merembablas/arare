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
    <client-only>
      <DashboardMenuItem
        v-if="isCreator"
        text="Items"
        :active="isActive('dashboard/items')"
        @click="$router.push('/dashboard/items')"
      />
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    isCreator() {
      return this.getCurrentIdentity()?.isCreator
    }
  },
  methods: {
    ...mapGetters('user', ['getCurrentIdentity']),
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
