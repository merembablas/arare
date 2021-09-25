<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <div
          class="
            border-2 border-gray-100
            p-2
            items-center
            flex
            justify-center
            rounded-xl
            bg-gray-200
          "
        >
          <div
            class="w-64 h-64 rounded-xl bg-gray-200"
            :style="`background: url('${thumbnail}') no-repeat center; background-size: cover`"
          ></div>
        </div>

        <FormCheckBox name="Has physical asset" />
        <FormSelect
          name="Asset location"
          :items="['Gallery ArtJog', 'Gallery Artmedia', 'Gallery ISI']"
        />
        <div>Custom Address</div>
        <textarea
          id="CustomAddress"
          name="CustomAddress"
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <FormSmartForm ref="form">
          <FormInputText name="Title" :auto-focus="true" />
          <FormInputText name="Description" :multi-line="true" />
          <FormInputText name="Royalties" type="percentage" />
          <FormSelect
            name="Collections"
            :items="['Jogjarockarta', 'Seroja One']"
          />
          <FormInputText name="Count" type="numeric" />
        </FormSmartForm>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: { type: String, required: true }
  }
}
</script>

<style>
</style>