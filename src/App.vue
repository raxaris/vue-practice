<template>
  <div class="app-container">
    <h1>Post page</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Search by username"
    >

    </my-input>
    <div class="app_btns">
      <my-button
          @click="showDialog"
      >
        Create Post
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @createPost="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        @removePost="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
export default {
  components:{
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },
  data(){
    return {
      posts: [],
      dialogVisible: false,
      modificatorValue: "",
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      sortOptions: [
        {value: 'username', name: 'By Username'},
        {value: 'deadline', name: 'By Deadline'}
      ]
    }
  },
  methods: {
    createPost(post){
      console.log(post)
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post){
      console.log(post)
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showDialog(){
      this.dialogVisible = true;
    },
    async fetchPromises(){
      try{
        this.isPostsLoading = true
        const response = await axios.get("http://localhost:3000/api/promises?limit=10")
        this.posts = response.data.map(post => ({
          ...post,
          username: post.user.username
        }));
        console.log(response.data)
      } catch (e) {
        alert(e)
      } finally {
          this.isPostsLoading = false
      }
    }
  },
  mounted() {
    this.fetchPromises()
  },
  watch: {

  },
  computed: {
    sortedPosts(){
      return [...this.posts].sort((post1,post2) => {
        const value1 = post1[this.selectedSort];
        const value2 = post2[this.selectedSort];

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return value1 - value2;
        }

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.localeCompare(value2);
        }

        if (value1 instanceof Date && value2 instanceof Date) {
          return value1 - value2;
        }

        const str1 = String(value1);
        const str2 = String(value2);
        return str1.localeCompare(str2);
      })
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.username.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container{
  padding: 20px;
}

.app_btns{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>