<template>
  <div class="mt-7">
    <SearchBox placeholder="Search" class="p-2" />
    <table class="table-auto mt-5 w-full border rounded">
      <thead>
        <tr>
          <th>Item</th>
          <th class="hidden md:block">Popularity</th>
          <th>Value</th>
          <th class="hidden md:block">View</th>
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
              <NuxtLink :to="`/items/${item.hash}`">
                <img
                  style="width: 64px; height: 64px"
                  class="cursor-pointer"
                  :src="`${baseUploadUrl}/${item.hash}${item.fileExtension}`"
                  alt="dummy"
                />
              </NuxtLink>
              <div class="ml-5 flex flex-col">
                <NuxtLink :to="`/items/${item.hash}`">{{ item.name }}</NuxtLink>
                <PopularityMeter class="md:hidden block" :star="3" :size="4" />
              </div>
            </div>
          </td>
          <td class="hidden md:block">
            <PopularityMeter :star="3" />
          </td>
          <td>130 ARA</td>
          <td class="hidden md:flex">
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