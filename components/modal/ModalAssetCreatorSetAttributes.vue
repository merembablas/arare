<template>
  <div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start justify-start"
    >
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

        <FormSmartForm ref="form1" :disabled="disabled">
          <FormCheckBox name="Has physical asset" />
          <FormSelect
            name="Asset location"
            :disabled="disabled"
            :items="['Gallery ArtJog', 'Gallery Artmedia', 'Gallery ISI']"
          />
          <FormInputText name="Custom address" :multi-line="true" />
        </FormSmartForm>
      </div>
      <div class="flex flex-col items-start justify-start">
        <FormSmartForm ref="form2" :disabled="disabled">
          <FormInputText name="Name" :auto-focus="true" />
          <FormInputText name="Description" :multi-line="true" />
          <FormInputText name="Royalties" type="percentage" />
          <FormSelect
            name="Collections"
            :items="['JogjaRockarta', 'Seroja One']"
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
    thumbnail: { type: String, required: true },
    inProcess: { type: Boolean, default: false }
  },
  data() {
    return {
      disabled: this.inProcess
    }
  },
  watch: {
    inProcess(state) {
      this.disabled = state
    }
  },
  methods: {
    getMapped() {
      const form1 = this.$refs.form1.toJSON()
      const form2 = this.$refs.form2.toJSON()
      const data = { ...form1, ...form2, objectType: 'picture' }
      return data
    }
  }
}
</script>

<style>
</style>
