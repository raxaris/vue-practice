<template>
  <form @submit.prevent>
    <h4>Create Post</h4>
    <my-input
        v-focus
        v-model="post.username"
        @input="post.username = $event.target.value"
        type="text"
        placeholder="Username"></my-input>
    <my-input
        v-model="post.content"
        @input="post.content = $event.target.value"
        type="text"
        placeholder="Content"></my-input>
    <my-input
        v-model="post.deadline"
        @input="post.deadline = $event.target.value"
        type="text"
        placeholder="Deadline"></my-input>
    <my-button
        class="mybtn"
        @click="createPost"
    >Create</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return{
      post: {
        username: '',
        content:'',
        deadline: '',
      }
    }
  },
  methods: {
    createPost(){
      this.post.id = Date.now()
      this.$emit('createPost', this.post)
      this.post = {
        username: '',
        content: '',
        deadline: ''
      }
    }
  }
}
</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;
}

.mybtn{
  align-self: flex-end;
  margin-top: 10px;
}
</style>