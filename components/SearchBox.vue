<template>
  <div class="flex bg-white rounded">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 left-0 ml-1 mt-1 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
    <input
      id="SearchBox"
      type="search"
      name="search"
      placeholder="Search keyword/item id"
      class="p-1 bg-transparent w-full focus:outline-none"
      autocomplete="off"
    />
  </div>
</template>