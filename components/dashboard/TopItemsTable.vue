<template>
  <div class="mt-7">
    <h2>Top Items</h2>
    <table class="table-auto mt-5 w-full border rounded">
      <thead>
        <tr>
          <th>Item</th>
          <th>Popularity</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 5" :key="i" :class="i % 2 == 1 ? 'odd' : ''">
          <td>
            <div class="flex items-center">
              <img src="/img/dummy-art-small-1.png" alt="dummy" />
              <div class="ml-5">Lukisan Nusantara</div>
            </div>
          </td>
          <td>
            <PopularityMeter :star="3" />
          </td>
          <td>130 ARA</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
h2 {
  color: @brand-color-blue;
  font-size: 1.2em;
}
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