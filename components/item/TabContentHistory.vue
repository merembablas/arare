<template>
  <div class="history flex flex-col pt-10">
    <ItemHistoryListItem :ping="true" :active="true" time="28 April 2021">
      <div class="flex">
        <span>Bought by</span>
        <div class="font-semibold text-green-500 ml-1">
          <ClickableName
            :name="item.creator.name"
            :link-to="`/user/${item.creator.id}`"
          />
        </div>
      </div>
    </ItemHistoryListItem>
    <ItemHistoryListItem time="1 April 2021">
      <div>
        <span>Bought by</span>
        <span class="font-semibold text-green-500">Alan Walker</span>
      </div>
    </ItemHistoryListItem>

    <!-- minting event -->
    <ItemHistoryListItem
      time="1 April 2021"
      :active="true"
      base-color="#f0ae3c"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#f0ae3c"
          :style="`margin-left: -3px; top: 1.5px;`"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </template>
      <div>
        <span>Minted by</span>
        <span class="font-semibold text-green-500">Alan Walker</span>
      </div>
    </ItemHistoryListItem>
    <!-- eof minting event -->
  </div>
</template>

<script>
export default {
  props: { item: { type: Object, required: true } }
}
</script>

<style>
</style>