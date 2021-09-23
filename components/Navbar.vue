<template>
  <div class="bg-white border-b-2 border-gray-300">
    <div>
      <div class="flex justify-between p-3 items-center">
        <div class="flex items-center">
          <Logo
            width="32"
            height="32"
            class="cursor-pointer"
            @click="$router.push('/')"
          />
          <a
            href="javascript://"
            class="
              pl-3
              hidden
              md:block
              font-semibold
              text-3xl text-gray-600
              focus:outline-none
            "
            @click="$router.push('/')"
            >arare.one</a
          >
        </div>

        <SearchBox class="ml-2" />

        <div class="flex space-x-3 justify-end pl-2 md:space-x-16 items-center">
          <!-- <NotifIcon :count="0" /> -->
          <div class="flex md:space-x-8">
            <NuxtLink class="p-2 hover:bg-blue-100 rounded-xl" to="/explorer"
              >EXPLORE</NuxtLink
            >
            <Button
              text="CREATE"
              :icon-mode="true"
              :icon-on-mobile="true"
              @click="showAssetCreator"
            >
              <template #icon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </template>
            </Button>
          </div>
          <ConnectButton />
        </div>
      </div>

      <div>
        <div>
          <a href="#" class="block"></a>
        </div>
      </div>
    </div>

    <ModalAssetCreator v-model="assetCreatorVisible" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      assetCreatorVisible: false
    }
  },
  methods: {
    showAssetCreator() {
      this.assetCreatorVisible = true
    }
  }
}
</script>