<template>
  <ModalBaseModal v-model="visible">
    <template #caption>
      <h3 class="text-xl font-semibold p-0 m-0">Place a bid</h3>
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
              <ClickableName
                class="text-sm"
                name="Galam Zulkifli"
                link-to="/creator/galam"
              />
            </p>
          </div>
        </div>
        <div class="text-sm text-gray-500">Highest Bid:</div>
        <div>30 ARA</div>
        <div class="text-sm text-gray-500">(Rp. 9.000.000,-)</div>
        <div
          class="mt-5 flex flex-col items-center justify-center content-center"
        >
          <div>Your Bid:</div>
          <div class="flex flex-row">
            <input
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
              placeholder="eg: 100"
            />
            <select
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
            </select>
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
          p-6
          border-t border-solid border-blueGray-200
          rounded-b
        "
      >
        <button
          class="
            text-red-500
            bg-transparent
            border border-solid border-red-500
            hover:bg-red-500
            hover:text-white
            active:bg-red-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
          type="button"
          @click="visible = false"
        >
          Cancel
        </button>
        <button
          class="
            text-green-500
            font-bold
            uppercase
            px-6
            py-3
            text-sm
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
            rounded
            border border-solid border-green-500
            ease-linear
            transition-all
            duration-150
            hover:bg-green-500
            hover:text-white
          "
          type="button"
          @click="onBid"
        >
          BID!
        </button>
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
      visible: this.value
    }
  },
  watch: {
    value(b, a) {
      this.visible = b
      this.$emit('input', this.visible)
    },
    visible(visibility) {
      this.$emit('input', visibility)
      setTimeout(() => this.$refs.inputPrice.focus(), 100)
    }
  },
  methods: {
    onBid() {
      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  }
}
</script>

<style>
</style>
