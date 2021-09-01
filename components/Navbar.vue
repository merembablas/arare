<template>
  <div class="bg-white border-b-2 border-gray-300">
    <div>
      <div class="flex justify-between p-3 items-center">
        <div class="flex items-center">
          <Logo width="32" height="32" />
          <a
            href="/"
            class="pl-3 font-semibold text-2xl text-gray-600 focus:outline-none"
            >arare.one</a
          >
        </div>

        <SearchBox />

        <div class="flex justify-end space-x-16 items-center">
          <NotifIcon :count="0" />
          <ConnectButton />
        </div>
      </div>

      <div>
        <!-- menu -->
        <div>
          <a href="#" class="block"></a>
        </div>
      </div>
    </div>
  </div>
</template>