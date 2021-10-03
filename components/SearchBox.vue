<template>
  <div>
    <div
      v-if="!inputBoxMobileVisible"
      :class="`text-gray-400 bg-gray-200 p-2 md:hidden rounded-xl`"
      @click="showInputBox(true)"
    >
      <IconSearch color="#0d67e5" />
    </div>
    <div
      :class="`
        relative
        text-gray-400
        focus-within:text-gray-600
        md:flex
        justify-center
        border-gray-200 border-2
        rounded-xl
        ${inputBoxMobileVisible ? '' : 'hidden'}
      `"
    >
      <div style="position: absolute; left: 2px; top: 3px">
        <IconSearch :color="glassColor" />
      </div>
      <input
        ref="inputBox"
        v-model="query"
        :class="`
        pl-8
        pt-1
        pb-1
        focus:ring-2 focus:ring-gray-300
        outline-none
        focus:outline-none
        rounded-xl
        ${inFocus ? 'w-96' : 'w-full'}`"
        autocomplete="off"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @keypress="onKeypress"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Search keyword/item id'
    }
  },
  data() {
    return {
      glassColor: '#cacaca',
      inFocus: false,
      inputBoxMobileVisible: false,
      query: ''
    }
  },
  methods: {
    ...mapMutations('search', ['setSearchResult', 'setCurrentQuery']),
    onFocus() {
      this.glassColor = '#0D67E5'
      this.inFocus = true
      this.$refs.inputBox.setSelectionRange(0, this.query.length)
    },
    onBlur() {
      this.glassColor = '#cacaca'
      this.inFocus = false
      this.showInputBox(false)
    },
    showInputBox(state) {
      this.inputBoxMobileVisible = state
      if (state) {
        setTimeout(() => {
          this.$refs.inputBox.focus()
        }, 400)
      }
    },
    onKeypress(event) {
      if (event.keyCode === 13) {
        if (this.$route.path.startsWith('/search')) {
          const query = this.query
          console.log(
            '🚀 ~ file: SearchBox.vue ~ line 88 ~ onKeypress ~ query',
            query
          )
          this.setCurrentQuery(query)
          if (query.length > 0) {
            this.$axios
              .get(`/api/search/items?q=${query}`)
              .then(({ data: { error, result } }) => {
                if (error) {
                  alert(error)
                  return
                }
                this.setSearchResult(result)
              })
          }
        } else {
          this.$router.push(`/search?q=${this.query}`)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>