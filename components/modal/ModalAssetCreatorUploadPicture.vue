<template>
  <div
    class="
      p-10
      flex
      items-center
      justify-center
      border-2 border-blue-200
      rounded-xl
      w-96
      bg-gray-a
    "
  >
    <div class="flex flex-col justify-center items-center cursor-pointer">
      <div>Drag &amp; Drop</div>
      <div>or</div>
      <div class="hover:text-blue-500" @click="openUploadDialog">
        Upload Picture
      </div>
      <div>Here</div>
    </div>
    <form
      ref="formUpload"
      action="/uploader/upload_picture"
      method="post"
      enctype="multipart/form-data"
    >
      <input
        ref="imageUpload"
        type="file"
        name="picture"
        style="display: none"
        @change="onChange"
      />
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    openUploadDialog() {
      this.$refs.imageUpload.click()
    },
    onChange() {
      this.upload()
    },
    upload() {
      const formData = new FormData()
      //   console.log(this.$refs.imageUpload.file)
      formData.append('picture', this.$refs.imageUpload.files[0])
      this.$axios.post('/uploader/upload_picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
</script>

<style>
</style>