<template>
  <div>
    <Navbar />
    <div class="m-10">
      <div class="flex justify-between">
        <div
          class="
            rounded
            bg-gray-300
            w-2/4
            h-screen
            flex flex-grow
            justify-center
            items-center
            shadow-md
          "
        >
          <div
            class="w-2/4 h-3/6 rounded shadow-md"
            :style="`
              background: url(https://picsum.photos/seed/arare${itemId}/400/400) center no-repeat;
            `"
          ></div>
        </div>

        <div class="w-2/4 ml-10">
          <h1 class="font-extrabold text-2xl">
            Lukisan Nusantara - Burung Elang {{ itemId }}
          </h1>
          <div>
            <span
              >by:
              <ClickableName name="Galam Zulkifli" link-to="/creator/galam" />
            </span>
          </div>
          <ItemFieldInfo a-key="Collection" value="Lukisan Nusantara" />
          <ItemFieldInfo a-key="Value" value="30 ARA" extra="(Rp. 18.000,-)" />
          <ItemFieldInfo
            a-key="Current owner"
            value="Gray Zein Syahputra"
            value-type="user"
            link-to="/user/grayzein"
          />
          <ItemFieldInfo
            a-key="Asset location"
            value="ArtJog Gallery Yogyakarta"
            value-type="location"
            link-to="/gallery/artjog"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemId: this.$route.params.itemId
    }
  }
}
</script>


<style lang="less">
</style>