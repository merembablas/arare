<template>
  <div class="bg-blue-700 border-b-2 border-blue-600">
    <div>
      <div class="flex justify-between p-2 items-center">
        <div>
          <a href="/" class="font-semibold text-white focus:outline-none"
            >Arare.one</a
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