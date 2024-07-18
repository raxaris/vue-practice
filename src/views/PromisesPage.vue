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
    <div ref="observer" class="observer">

    </div>
    <!--    <div class="page__wrapper">-->
    <!--      <div-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--          :key="pageNumber"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--            'current-page': page === pageNumber-->
    <!--          }"-->
    <!--          @click="changePage(pageNumber)"-->
    <!--      >-->
    <!--        {{pageNumber}}-->
    <!--      </div>-->
    <!--    </div>-->
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
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'username', name: 'By Username'},
        {value: 'deadline', name: 'By Deadline'},
        {value: 'id', name: 'By ID'},
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
        const response = await axios.get("http://localhost:3000/api/promises", {
          params: {
            page: this.page,
            limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.data.count/this.limit)
        this.posts = response.data.rows.map(this.reformatPostData);
        console.log(response.data)
      } catch (e) {
        alert(e)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePromises(){
      try{
        this.page += 1
        const response = await axios.get("http://localhost:3000/api/promises", {
          params: {
            page: this.page,
            limit: this.limit,
          }
        })
        this.totalPages = Math.ceil(response.data.count/this.limit)
        this.posts = [...this.posts, ...response.data.rows.map(this.reformatPostData)];
        console.log(response.data)
      } catch (e) {
        alert(e)
      }
    },
    reformatPostData(post){
      return {
        ...post,
        username: post.user.username
      };
    }
    // changePage(pageNumber){
    //   this.page = pageNumber;
    //   this.fetchPromises()
    // }
  },
  mounted() {
    this.fetchPromises()
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPages){
        this.loadMorePromises()
      }
    }
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  watch: {
    // page(){
    //   this.fetchPromises()
    // }
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