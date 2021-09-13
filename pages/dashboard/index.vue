<template>
  <div class="p-10">
    <h1>Balance 3000 ARA</h1>

    <DashboardTransactionTable />
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
  color: #0d67e5;
  line-height: 1em;
}
p {
  color: #6c7080;
  font-size: 1.7em;
  font-weight: bold;
}
</style>