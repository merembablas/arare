<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Place Bid</h3>
    </template>
    <template #body>
      <div
        class="
          text-lg
          flex flex-col
          items-center
          justify-center
          leading-relaxed
        "
      >
        <div class="items-center flex flex-col">
          <p class="font-semibold">{{ item.name }}</p>
          <div class="pb-5">
            <p class="text-sm">
              by
              <NuxtLink class="link-color" :to="`/user/${item.creator.id}`">{{
                item.creator.name
              }}</NuxtLink>
            </p>
          </div>
        </div>
        <div class="text-sm text-gray-500">Highest Bid:</div>
        <div>30 ARA</div>
        <div class="text-sm text-gray-500">(Rp. 9.000.000,-)</div>
        <div
          class="mt-5 flex flex-col items-center justify-center content-center"
        >
          <!-- <div>Your Bid:</div> -->
          <div class="flex flex-row">
            <FormSmartForm ref="form" :disabled="inProcess">
              <!-- <input
                ref="inputPrice"
                type="text"
                class="
                  pl-5
                  pt-2
                  pb-2
                  block
                  border-l border-t border-b border-solid border-gray-400
                  outline-none
                  focus:outline-none
                  rounded-l
                "
                placeholder="100"
              /> -->
              <FormInputSelect
                name="Bid for"
                placeholder="100"
                :auto-focus="true"
                type="numeric"
                use-key="value"
                :select-items="['ARA', 'ETH']"
              />
              <!-- <select
                id="Currency"
                name="currency"
                class="
                  border-r border-t border-b border-solid border-gray-400
                  rounded-r
                  outline-none
                  focus:outline-none
                "
              >
                <option>ARA</option>
                <option>IDR</option>
              </select> -->
            </FormSmartForm>
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <div
        class="
          flex
          items-center
          justify-end
          space-x-5
          p-6
          border-t border-solid border-blueGray-200
          rounded-b
        "
      >
        <Button text="Cancel" color-class="bg-red-600" @click="onCancel" />
        <Button text="BID!" color-class="bg-green-600" @click="onBid" />
      </div>
    </template>
  </ModalBaseModal>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false }, // for visibility toggle
    item: { type: Object, required: true }
  },
  data() {
    return {
      visible: this.value,
      inProcess: false
    }
  },
  watch: {
    value(b, a) {
      this.visible = b
      this.$emit('input', this.visible)
    },
    visible(visibility) {
      this.$emit('input', visibility)
      // setTimeout(() => this.$refs.inputPrice.focus(), 100)
    }
  },
  methods: {
    close() {
      this.visible = false
      this.$emit('input', this.visible)
      // this.visible = !this.visible
      //     this.$emit('input', this.visible)
    },
    onCancel() {
      this.close()
    },
    onBid() {
      // const s = this.value.split(' ')
      const formData = this.$refs.form.toJSON()
      console.log(
        '🚀 ~ file: PlaceBid.vue ~ line 125 ~ onBid ~ formData',
        formData
      )
      const s = formData.value.split(' ')

      const value = s[0]
      const tokenType = s[1]
      const data = {
        itemId: this.item.id,
        value: parseFloat(value),
        tokenType
      }
      this.$axios.post(`/api/bid`, data).then(({ data: { error, result } }) => {
        if (error) {
          alert(error)
          return
        }

        this.close()
      })
    }
  }
}
</script>

<style>
</style>
