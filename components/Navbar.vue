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
          <ExploreButton />
          <client-only>
            <CreateButton v-if="connected" @click="showAssetCreator" />
          </client-only>
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
import AccountMethods from '~/components/AccountMethods'
export default {
  extends: AccountMethods,
  data() {
    return {
      assetCreatorVisible: false
    }
  },
  methods: {
    showAssetCreator() {
      // pastikan user sudah punya identity dulu
      // kalau belum suruh register

      if (!this.getCurrentIdentity()) {
        alert(
          'Please set the identity in dashboard > profile first before creating'
        )
        this.$router.push('/dashboard/profile')
        return
      }
      this.assetCreatorVisible = true
    }
  }
}
</script>