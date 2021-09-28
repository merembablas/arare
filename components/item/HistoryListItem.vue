<template>
  <div class="pl-5 pr-10 flex justify-between items-start">
    <div class="flex space-x-6 h-20">
      <!-- ping animation -->
      <div class="relative">
        <slot name="icon">
          <span
            v-if="active && ping"
            class="
              animate-ping
              absolute
              inline-flex
              h-5
              w-5
              rounded-full
              opacity-75
            "
            :style="`left: 2px; top: 1.5px; background-color: ${baseColor}`"
          ></span>
          <svg
            v-if="active"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="12"
              :fill="baseColor"
              fill-opacity="0.25"
            />
            <circle cx="12" cy="12" r="6" :fill="baseColor" />
          </svg>

          <svg
            v-if="!active"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#cacaca" fill-opacity="0.25" />
            <circle cx="12" cy="12" r="6" fill="#cacaca" />
          </svg>
          <div
            class="absolute h-14 border-l-4 border-gray-200"
            style="left: 10px"
          ></div>
        </slot>
      </div>
      <!-- end of ping animation -->
      <div class="text-sm">
        <div>
          <slot></slot>
          <div class="pt-2 text-gray-400" :title="$moment(time)">
            {{ $moment(time).fromNow() }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="itemValue && itemValue > 0" class="flex items-center space-x-2">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8" cy="8" r="8" fill="#777D90" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.00124 10.8211C3.92882 10.5631 7.05062 3.91886 8.32622 4.00075C9.99844 4.10809 12.228 10.6157 11.9811 10.8653C11.6603 11.1897 8.08262 9.37054 8.08262 8.78229C8.08262 8.50583 10.0555 8.78776 10.0502 8.43303C10.0502 7.62164 9.00782 6.23322 8.42164 6.25574C7.87782 6.25574 8.03369 10.4385 7.36231 10.7688C6.78039 11.0551 4.07372 11.079 4.00124 10.8211Z"
          fill="white"
        />
      </svg>
      <div class="text-sm" style="color: #777d90">
        {{ itemValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ping: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    time: { type: String, required: true },
    baseColor: { type: String, default: '#0D67E6' },
    itemValue: { type: String, default: null }
  }
}
</script>