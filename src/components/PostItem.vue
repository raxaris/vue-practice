<template>
  <div class="post">
    <div>
      <div><strong>ID:</strong>{{post.id}}</div>
      <div><strong>Username: </strong> {{post.username}} </div>
      <div><strong>Content: </strong> {{post.content}} </div>
      <div><strong>Deadline: </strong> {{post.deadline}} </div>
    </div>
    <div class="post_btns">
      <my-button
          @click="$router.push(`/promises/${post.id}`)"
      >
        Open</my-button>
      <my-button
      @click="$emit('removePost', post)"
      >
        Delete</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post{
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post_btns{
  display: flex;
}
</style>