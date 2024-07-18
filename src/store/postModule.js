import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                const value1 = post1[state.selectedSort];
                const value2 = post2[state.selectedSort];

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
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.username.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts (state, posts) {
            state.posts = posts
        },
        setLoading (state, bool) {
            state.isPostsLoading = bool
        },
        setPage (state, page) {
            state.page = page
        },
        setSelectedSort (state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages (state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery (state, searchQuery) {
            state.searchQuery = searchQuery
        }
    },
    actions: {
        async fetchPromises({state,commit, dispatch}) {
            try {
                commit('setLoading', true)
                const response = await axios.get("http://localhost:3000/api/promises", {
                    params: {
                        page: state.page,
                        limit: state.limit,
                    }
                })
                commit('setTotalPages', Math.ceil(response.data.count / state.limit));
                const posts = response.data.rows.map(post => ({
                    ...post,
                    username: post.user.username
                }));
                commit('setPosts', posts)
                console.log(response.data)
            } catch (e) {
                console.log(e)
            } finally {
                commit('setLoading', false)
            }
        },
        async loadMorePromises({state,commit, dispatch}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get("http://localhost:3000/api/promises", {
                    params: {
                        page: state.page,
                        limit: state.limit,
                    }
                })
                commit('setTotalPages',Math.ceil(response.data.count / state.limit))
                const posts = response.data.rows.map(post => ({
                    ...post,
                    username: post.user.username
                }));
                commit('setPosts', [...state.posts, ...posts]);
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        },
    },
    namespaced: true
};