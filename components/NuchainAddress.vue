<template>
  <div class="relative">
    <div v-if="copied" class="absolute w-40 bg-yellow-300 rounded-xl pl-2 pr-2">
      Address copied!
    </div>
    <div
      v-show="tooltipVisible"
      class="
        absolute
        bg-white
        border-2
        rounded-xl
        pl-2
        pr-2
        transition
        duration-500
      "
      style="top: -30px"
    >
      {{ address }}
    </div>
    <div
      title="Click to copy to clipboard"
      :class="`rounded-xl w-auto pl-2 pr-2 ${bgColor} text-gray-700 cursor-pointer transition duration-500 ease-in-out`"
      @click="copyAddress"
      @mouseover="showTooltip()"
      @mouseleave="hideTooltip()"
    >
      <div>{{ truncatedAddress }}</div>
    </div>
  </div>
</template>

<script>
let tooltipTimeout = null
export default {
  props: {
    address: { type: String, required: true }
  },
  data() {
    return {
      bgColor: 'bg-gray-200',
      tooltipVisible: false,
      copied: false,
      lastCopied: 0
    }
  },
  computed: {
    truncatedAddress() {
      return this.formatAddress(this.address)
    }
  },
  methods: {
    formatAddress(addr) {
      return `${addr.substring(0, 4)}...${addr.substring(
        addr.length - 4,
        addr.length
      )}`
    },
    copyAddress() {
      navigator.clipboard.writeText(this.address.trim())
      this.bgColor = 'bg-blue-400'
      this.copied = true
      this.hideTooltip()
      setTimeout(() => {
        this.bgColor = 'bg-gray-200'
        this.copied = false
        this.lastCopied = new Date().getTime()
      }, 600)
    },
    showTooltip() {
      if (this.lastCopied > new Date().getTime() - 1000) {
        return
      }
      this.tooltipVisible = true
      tooltipTimeout = setTimeout(() => {
        this.hideTooltip()
      }, 2500)
    },
    hideTooltip() {
      if (tooltipTimeout) {
        clearTimeout(tooltipTimeout)
        tooltipTimeout = null
      }
      this.tooltipVisible = false
    }
  }
}
</script>

<style>
</style>