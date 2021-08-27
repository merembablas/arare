<template>
  <div class="mt-5">
    <div class="text-sm text-gray-500">{{ aKey }}:</div>
    <div v-if="!valueType" class="font-semibold">{{ value }}</div>
    <ClickableName v-if="valueType == 'user'" :name="value" :link-to="linkTo" />
    <ClickableName
      v-if="valueType == 'location'"
      :name="value"
      :link-to="linkTo"
      color="pink-600"
    />
    <div class="text-gray-500 text-sm">{{ extra }}</div>
  </div>
</template>

<script>
export default {
  props: {
    aKey: { type: String, required: true },
    value: { type: String, required: true },
    extra: { type: String, default: null },
    valueType: { type: String, default: null },
    linkTo: { type: String, default: null }
  }
}
</script>