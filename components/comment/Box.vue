<template>
  <div class="flex flex-col space-y-2">
    <LoadingSmall v-if="!loaded" />
    <CommentListItem
      v-for="comment in comments"
      :id="comment.id"
      :key="comment.id"
      :creator-id="comment.creator.id"
      :creator-name="comment.creator.name"
      :creator-pic="comment.creator.pic"
      :time="comment.timestamp"
      :message="comment.message"
    />
    <CommentCreator :item-id="item.id" @newComment="onNewComment" />
  </div>
</template>

<script>
export default {
  props: { item: { type: Object, required: true } },
  data: () => ({
    loaded: false,
    comments: []
  }),
  mounted() {
    // this.comments = [
    //   {
    //     id: '123',
    //     creator: {
    //       name: 'John Kena',
    //       pic: 'https://i.pravatar.cc/300?u=123'
    //     },
    //     time: new Date().getTime() / 1000,
    //     message: 'Murah bener!'
    //   }
    // ]
    this.$axios
      .get(`/api/items/${this.item.id}/comments`)
      .then(({ data: { error, result } }) => {
        if (error) {
          console.log(
            '🚀 ~ file: Box.vue ~ line 34 ~ this.$axios.get ~ error',
            error
          )

          return
        }
        this.comments = result
      })
      .finally(() => {
        this.loaded = true
      })
  },
  methods: {
    onNewComment(comment) {
      this.comments.push(comment)
    }
  }
}
</script>

<style></style>
