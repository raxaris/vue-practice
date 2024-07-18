import {ref, computed} from "vue";

export default function useSortedPosts(posts) {
    const selectedSort = ref('')
    const sortedPosts = computed(() => {
        return [...posts].sort((post1,post2) => {
            const value1 = post1[selectedSort.value];
            const value2 = post2[selectedSort.value];
            const str1 = String(value1);
            const str2 = String(value2);
            return str1.localeCompare(str2);
        })
    })

    return{
        selectedSort, sortedPosts
    }
}