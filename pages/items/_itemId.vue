<template>
  <div>
    <Navbar />
    <div class="mt-2 md:m-10 h-full">
      <div class="flex flex-wrap h-full items-start justify-between w-full">
        <div
          v-if="item"
          class="
            justify-center
            align-center
            text-center
            font-extrabold
            md:hidden
            text-3xl
            w-full
            pb-2
          "
        >
          <h1>
            {{ item.name }}
          </h1>
          <div
            class="
              flex
              align-center
              text-center
              w-full
              items-center
              justify-center
            "
          >
            <div class="text-color-2 text-sm">This item has been verified</div>
            <IconVerified class="ml-1" />
          </div>
        </div>

        <div
          class="
            flex flex-col flex flex-grow
            justify-center
            items-center
            md:pr-2
            w-1/3
          "
        >
          <ItemPicDetail :item="item" />
          <div class="flex flex-col w-full">
            <div
              class="
                flex flex-grow
                justify-between
                items-center
                mt-5
                border-2
                w-full
                p-5
                cursor-pointer
              "
              @click="showDescription = !showDescription"
            >
              <div class="flex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7H21C21.2652 7 21.5196 6.89464 21.7071 6.70711C21.8946 6.51957 22 6.26522 22 6C22 5.73478 21.8946 5.48043 21.7071 5.29289C21.5196 5.10536 21.2652 5 21 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6C2 6.26522 2.10536 6.51957 2.29289 6.70711C2.48043 6.89464 2.73478 7 3 7ZM3 11H17C17.2652 11 17.5196 10.8946 17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10C18 9.73478 17.8946 9.48043 17.7071 9.29289C17.5196 9.10536 17.2652 9 17 9H3C2.73478 9 2.48043 9.10536 2.29289 9.29289C2.10536 9.48043 2 9.73478 2 10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11ZM21 13H3C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H21C21.2652 15 21.5196 14.8946 21.7071 14.7071C21.8946 14.5196 22 14.2652 22 14C22 13.7348 21.8946 13.4804 21.7071 13.2929C21.5196 13.1054 21.2652 13 21 13ZM17 17H3C2.73478 17 2.48043 17.1054 2.29289 17.2929C2.10536 17.4804 2 17.7348 2 18C2 18.2652 2.10536 18.5196 2.29289 18.7071C2.48043 18.8946 2.73478 19 3 19H17C17.2652 19 17.5196 18.8946 17.7071 18.7071C17.8946 18.5196 18 18.2652 18 18C18 17.7348 17.8946 17.4804 17.7071 17.2929C17.5196 17.1054 17.2652 17 17 17Z"
                    fill="#0D67E6"
                  />
                </svg>
                <div class="ml-2">Description</div>
              </div>
              <div>
                <svg
                  v-if="!showDescription"
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <svg
                  v-if="showDescription"
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
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </div>
            </div>

            <div
              v-if="showDescription"
              class="p-5 border-b-2 border-l-2 border-r-2"
            >
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
              </p>
            </div>
          </div>
        </div>

        <ItemInfoDetail :item="item" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: this.$route.params.itemId,
      item: null,
      name: '',
      showDescription: false
    }
  },
  fetch() {
    this.name = `Lukisan #${this.itemId}`
    this.item = this.$dummy.generateItem(this.itemId)
  }
}
</script>


<style lang="less">
</style>