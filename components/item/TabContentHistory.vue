<template>
  <div class="history flex flex-col pt-10">
    <ItemHistoryListItem :ping="true" :active="true" time="28 April 2021">
      <div>
        <span>Bought by</span>
        <span class="font-semibold text-green-500">
          <ClickableName
            :name="item.owner.name"
            :link-to="`/user/${item.owner.id}`"
          />
        </span>
      </div>
    </ItemHistoryListItem>
    <ItemHistoryListItem time="1 April 2021">
      <div>
        <span>Bought by</span>
        <span class="font-semibold text-green-500">Alan Walker</span>
      </div>
    </ItemHistoryListItem>
    <ItemHistoryListItem time="1 April 2021">
      <div>
        <span>Bought by</span>
        <span class="font-semibold text-green-500">Alan Walker</span>
      </div>
    </ItemHistoryListItem>
  </div>
</template>

<script>
export default {
  props: { item: { type: Object, required: true } }
}
</script>

<style>
</style>