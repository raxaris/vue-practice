import {createRouter, createWebHistory} from "vue-router";
import Main from "@/views/Main.vue"
import PromisePage from "@/views/PromisePage.vue";
import PromisesPage from "@/views/PromisesPage.vue";
import About from "@/views/About.vue";
import PromisesPageWithStore from "@/views/PromisesPageWithStore.vue";
import PostPageCompositionApi from "@/views/PostPageCompositionApi.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/promises',
        component: PromisesPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/promises/:id',
        component: PromisePage
    },
    {
        path: '/store',
        component: PromisesPageWithStore
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router