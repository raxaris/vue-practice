<template>
  <div>
    <h1>Post page</h1>
    <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Search by username"
    >

    </my-input>
    <div class="app_btns">
      <my-button
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

      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
      <div ref="observer" class="observer">
    </div>
  </div>
</template>
<script>
import PostList from "@/components/PostList.vue";
import PostForm from "@/components/PostForm.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {ref} from "vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
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
      dialogVisible: false,
      sortOptions: [
        {value: 'username', name: 'By Username'},
        {value: 'deadline', name: 'By Deadline'},
        {value: 'id', name: 'By ID'},
      ]
    }
  },
  setup(props){
    const {posts, totalPages, isPostsLoading} = usePosts(10)
    const {sortedPosts, selectedSort} = useSortedPosts(posts)
    const {sortedAndSearchedPosts, searchQuery} = useSortedAndSearchedPosts(posts)

    return{
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      sortedAndSearchedPosts,
      searchQuery
    }
  }
}
</script>
<style>
.app_btns{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper{
  display: flex;
  margin-top: 15px;
}

.page{
  border: 1px solid black;
  padding: 10px;
}

.current-page{
  border: 2px solid teal;
}

.observer{
  height: 30px;
  background: greenyellow;
}
</style>