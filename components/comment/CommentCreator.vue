<template>
  <div v-if="me" class="comment-creator flex">
    <div class="creator flex flex-col items-center">
      <div
        class="w-7 h-7 rounded-full mt-2"
        :style="`background: url('${me.pic}') center center / cover no-repeat;`"
      ></div>
      <div
        class="
          creator-name
          text-green-600
          ml-2
          truncate
          justify-center
          text-center text-sm
          w-32
          font-semibold
        "
        :title="me.name"
      >
        {{ me.name }}
      </div>
    </div>
    <div class="flex flex-col p-2 relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-400 absolute"
        fill="white"
        viewBox="0 0 24 24"
        stroke="currentColor"
        style="left: -16px; top: 0px"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 19l-7-7 7-7"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <div>
        <FormSmartForm ref="form" :disabled="inProcess">
          <FormInputText name="message" :multi-line="true" />
        </FormSmartForm>
        <div class="flex justify-end">
          <Button
            text="Comment"
            class="mt-2"
            color-class="bg-blue-500"
            :disabled="inProcess"
            :loading="inProcess"
            @click="sendComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountMethods from '~/components/AccountMethods'

export default {
  extends: AccountMethods,
  props: { itemId: { type: String, required: true } },
  data: () => ({
    me: null,
    inProcess: false
  }),
  mounted() {
    this.me = this.getCurrentIdentity()
  },
  methods: {
    sendComment() {
      const form = this.$refs.form
      const data = form.toJSON()
      this.$axios
        .post(`/api/items/${this.itemId}/comments`, data)
        .then(({ data: { error, result } }) => {
          if (error) {
            alert('Cannot post comment')
            return
          }
          form.clear()
          this.$emit('newComment', result)
        })
    }
  }
}
</script>

<style>
</style>