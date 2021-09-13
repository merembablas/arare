<template>
  <div class="p-10 w-2/3 h-full">
    <div class="grid grid-cols-3 gap-4 h-full">
      <DashboardStatItem name="Balance" value="1.000 ARA" />
      <DashboardStatItem name="Collections" value="5" />
      <DashboardStatItem name="Items" value="100 ARA" />
    </div>

    <DashboardTransactionTable />
    <DashboardTopItemsTable />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      creators: this.$dummy.generateUsers(5)
    }
  }
}
</script>


<style lang="less">
.headline {
  font-family: 'RobotoSlab bold', Helvetica, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: @brand-color-blue;
  line-height: 1em;
}
p {
  color: #6c7080;
  font-size: 1.7em;
  font-weight: bold;
}
</style>