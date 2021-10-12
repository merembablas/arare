<template>
  <div v-if="visible">
    <div class="opacity-25 fixed inset-0 z-40 bg-black"></div>

    <div
      :class="`overflow-x-hidden overflow-y-auto
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        ${customClass}
        flex`"
    >
      <div class="relative w-full md:w-auto md:max-w-6xl">
        <div class="relative flex flex-col bg-white w-full rounded-xl">
          <div class="flex items-start justify-between p-5 border-b rounded-t">
            <slot name="caption" />
            <button
              class="
                p-0
                m-0
                bg-transparent
                border-0
                opacity-30
                text-black
                float-right
                text-3xl
                leading-none
                font-semibold
                outline-none
                focus:outline-none
              "
              @click="toggleModal"
            >
              <span
                class="
                  bg-transparent
                  opacity-30
                  hover:opacity-80
                  text-black
                  h-6
                  w-6
                  text-2xl
                  block
                  outline-none
                  focus:outline-none
                "
              >
                ×
              </span>
            </button>
          </div>

          <div class="relative p-6 flex-auto">
            <slot name="body" />
          </div>

          <slot name="actions" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    value: { type: Boolean, default: false }, // for visibility toggle
    customClass: { type: String, default: '' }
  },
  data() {
    return {
      visible: this.value
    }
  },
  watch: {
    value(b, a) {
      this.visible = b
    },
    visible(visibility) {
      this.$emit('input', visibility)
    }
  },
  methods: {
    toggleModal() {
      this.visible = !this.visible
      this.$emit('input', this.visible)
    }
  }
}
</script>

<style lang="less">
div.modal-elm {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh; /* I changed this one only */
  overflow: auto;
  background-color: black;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>

