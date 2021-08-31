<template>
  <div class="bg-white border-b-2 border-blue-600">
    <div>
      <div class="flex justify-between p-5 items-center">
        <div class="flex items-center">
          <Logo width="32" height="32" />
          <a
            href="/"
            class="pl-3 font-semibold text-2xl text-gray-600 focus:outline-none"
            >arare.one</a
          >
        </div>

        <SearchBox />

        <div>
          <button class="focus:outline-none text-white flex">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span class="mx-1">Connect</span>
          </button>
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