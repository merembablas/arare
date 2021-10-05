<template>
  <div
    class="
      flex flex-col
      md:w-64
      min-h-screen
      items-top
      justify-start
      dashboard-sidebar
    "
  >
    <!-- <div class="p-5"><h1>Explorer</h1></div> -->
    <ExplorerMenuItem text="Home" :active="isActive('explorer')" to="/explorer">
      <IconHome color="#0d67e5" />
    </ExplorerMenuItem>
    <ExplorerMenuItem
      text="Popular"
      :active="isActive('explorer/hot')"
      to="/explorer/hot"
    >
      <IconFire color="#d9630f" />
    </ExplorerMenuItem>
    <ExplorerMenuItem
      text="Most Valuable"
      :active="isActive('explorer/most-valuable')"
      to="/explorer/most-valuable"
    >
      <IconChart color="#0d67e5" />
    </ExplorerMenuItem>
    <ExplorerMenuItem
      text="Latest"
      :active="isActive('explorer/latest')"
      to="/explorer/latest"
    >
      <IconLightning color="#0d67e5" />
    </ExplorerMenuItem>
    <ExplorerMenuItem
      text="History"
      :active="isActive('explorer/history')"
      to="/explorer/history"
    >
      <IconClock color="#0d67e5" />
    </ExplorerMenuItem>
    <div class="border hidden md:block"></div>
    <div class="p-5 hidden md:block">
      <h2>Filters</h2>
      <div>
        <FormCheckBox name="Has physical asset" />
        <FormCheckBox name="Digital only" />
      </div>
    </div>
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
.dashboard-sidebar {
  background-color: @bg-color-1;
}
</style>