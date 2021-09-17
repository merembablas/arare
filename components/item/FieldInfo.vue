<template>
  <div class="mt-5 flex flex-col relative">
    <div class="text-sm text-gray-500">{{ aKey }}:</div>

    <div class="flex field-info items-center">
      <div
        v-if="!valueType && !enableEdit && theValue"
        class="w-96 flex items-center"
      >
        <div>{{ theValue }}</div>
        <div
          v-if="editable"
          class="flex ml-2 pencil-icon"
          @click="activateEditMode(true)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </div>
      <div v-if="enableEdit">
        <input
          v-if="!multiLine"
          ref="newValue"
          v-model="newValue"
          type="text"
          class="w-full border-2 p-1 rounded outline-none"
          :disabled="inSaving"
          @keyup="onKeyup"
          @blur="onOutFocus"
        />
        <div v-if="multiLine" class="flex flex-col">
          <textarea
            id="NewValue"
            ref="newValue"
            v-model="newValue"
            :class="`w-full border-2 p-1 rounded outline-none ${
              inSaving ? 'bg-gray-300' : ''
            }`"
            name="newValue"
            cols="30"
            rows="3"
            :disabled="inSaving"
            @keyup="onKeyup"
            @blur="onOutFocus"
          ></textarea>

          <Button text="Save" :disabled="inSaving" @click="onSave" />
        </div>
      </div>
      <!-- loading spinner -->
      <div
        v-if="enableEdit && inSaving"
        style="border-top-color: transparent"
        class="
          w-4
          h-4
          border-4 border-blue-400 border-double
          rounded-full
          animate-spin
          ml-3
        "
      ></div>
      <ClickableName
        v-if="valueType == 'user'"
        :name="theValue"
        :link-to="linkTo"
      />
      <ClickableName
        v-if="valueType == 'location'"
        :name="theValue"
        :link-to="linkTo"
        color="pink-600"
      />
      <slot></slot>
    </div>

    <div v-if="extra" class="text-gray-500 text-sm">{{ extra }}</div>
  </div>
</template>

<script>
let outFocusTimeout = null
export default {
  props: {
    aKey: { type: String, required: true },
    value: { type: String, default: null },
    extra: { type: String, default: null },
    valueType: { type: String, default: null },
    linkTo: { type: String, default: null },
    editable: { type: Boolean, default: false },
    editMode: { type: Boolean, default: false },
    multiLine: { type: Boolean, default: false },
    onChanged: { type: Function, default: null }
  },
  data() {
    return {
      newValue: this.value,
      theValue: this.value,
      enableEdit: false,
      inSaving: false
    }
  },
  watch: {
    value(newVal) {
      this.newValue = newVal
      // this.$emit('input', this.newValue)
    }
  },
  methods: {
    async onKeyup(keyboardEvent) {
      const multiLine = this.multiLine
      if (keyboardEvent.key === 'Enter' && !multiLine) {
        await this.doSave()
      }
    },
    async doSave() {
      if (!this.onChanged) {
        alert('onChanged callback not set')
        return false
      }
      this.inSaving = true
      this.enableEdit = true
      this.theValue = this.$refs.newValue.value.trim()
      this.$emit('input', this.newValue)
      // console.log(
      //   '🚀 ~ file: FieldInfo.vue ~ line 103 ~ onKeyup ~ this.newValue',
      //   this.newValue
      // )

      await this.onChanged(this.newValue)

      this.inSaving = false
      this.enableEdit = false
      return true
    },
    activateEditMode(state) {
      this.enableEdit = state
      setTimeout(() => this.$refs.newValue.focus(), 300)
    },
    onOutFocus() {
      outFocusTimeout = setTimeout(() => {
        if (!this.inSaving) {
          this.enableEdit = false
        }
      }, 500)
    },
    async onSave() {
      if (outFocusTimeout) {
        clearTimeout(outFocusTimeout)
        outFocusTimeout = null
      }
      const rv = await this.doSave()
      if (!rv) {
        this.enableEdit = false
      }
    }
  }
}
</script>

<style lang="less">
.field-info:hover {
  .pencil-icon {
    display: block;
  }
}
.pencil-icon {
  cursor: pointer;
  display: none;

  &:hover {
    color: @brand-color-blue;
  }
}
</style>