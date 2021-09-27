<template>
  <div class="mt-7">
    <SearchBox placeholder="Search" class="p-2" />
    <table class="table-auto mt-5 w-full border rounded">
      <thead>
        <tr>
          <th>Item</th>
          <th>Popularity</th>
          <th>Value</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in items"
          :key="i"
          :class="i % 2 == 1 ? 'odd' : ''"
        >
          <td>
            <div class="flex items-center">
              <img
                style="width: 64px; height: 64px"
                :src="`${baseUploadUrl}/${item.hash}${item.fileExtension}`"
                alt="dummy"
              />
              <div class="ml-5">
                <NuxtLink :to="`/items/${item.hash}`">{{ item.name }}</NuxtLink>
              </div>
            </div>
          </td>
          <td>
            <PopularityMeter :star="3" />
          </td>
          <td>130 ARA</td>
          <td class="flex">
            <div>127</div>
            <IconEye class="ml-2" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      baseUploadUrl: process.env.baseUploadUrl
    }
  },
  computed: {
    items() {
      return this.$store.state.items.myItems
    }
  },
  mounted() {
    if (this.$store.state.user.identity) {
      this.$arare.fetchMyItems(0, 20)
    } else {
      this.setMyItems([])
    }
  },
  methods: {
    ...mapMutations('items', ['setMyItems'])
  }
  // watch: {
  //     '$store.state.items.myItems'(items){

  //     }
  // }
}
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
tr {
  background-color: lighten(@bg-color-1, 5);
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