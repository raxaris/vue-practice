import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(limit){
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)
    const fetching = async () => {
        try{
            const response = await axios.get("http://localhost:3000/api/promises", {
                params: {
                    page: 1,
                    limit: limit,
                }
            })
            totalPages.value = Math.ceil(response.data.count/limit)
            posts.value = response.data.rows.map(reformatPostData);
            console.log(response.data)
        } catch (e) {
            alert(e)
        } finally {
            isPostsLoading.value = false
        }
    }

    onMounted(fetching)
    return {
        posts, isPostsLoading, totalPages
    }
}

function reformatPostData(post) {
    return {
        ...post,
        username: post.user.username
    };
}
