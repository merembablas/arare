<template>
  <div class="mt-7">
    <h2>Transactions</h2>
    <table class="table-auto mt-5 w-full border rounded">
      <thead>
        <tr>
          <th class="hidden md:table-cell">Time</th>
          <th class="hidden md:table-cell">Activity</th>
          <th>Item</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 5" :key="i" :class="`${i % 2 == 1 ? 'odd' : ''}`">
          <td class="hidden md:table-cell">09 Sept 2021</td>
          <td class="hidden md:table-cell">Royalty</td>
          <td>
            <div class="flex flex-col">
              <div>Lukisan Nusantara</div>
              <div
                class="
                  flex
                  md:hidden
                  justify-start
                  items-center
                  space-x-1
                  text-gray-300
                "
              >
                <IconClock size="15px" />
                <small>09 Sept 2021</small>
              </div>
            </div>
          </td>
          <td :class="i % 2 == 1 ? 'positive' : 'negative'">
            {{ i % 2 == 1 ? '+' : '-' }} 103 ARA
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
th {
  background-color: @bg-color-2;
  text-align: left;
  padding: 10px;
}
tr.odd {
  background-color: @bg-color-1;
}
tr td {
  padding: 10px;

  &.positive {
    color: #06bbac;
  }
  &.negative {
    color: #e92246;
  }
}
</style>