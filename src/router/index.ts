import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/Index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/auth/Login.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/views/auth/Logout.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/auth/Register.vue')
        },
        {
            path: '/edit',
            name: 'edit',
            component: () => import('@/views/auth/Edit.vue')
        },
        {
            path: '/create',
            name: 'article-create',
            component: () => import('@/views/articles/AddEdit.vue')
        },
       {
            path: '/edit/:slug',
            name: 'article-edit',
            component: () => import('@/views/articles/AddEdit.vue')
        },
        {
            path: '/articles',
            name: 'articles',
            component: () => import('@/views/articles/Index.vue')
        },
        {
            path: '/articles/page/:pageNumber',
            name: 'articles-page',
            component: () => import('@/views/articles/Index.vue')
        },
 {
            path: '/test',
            name: 'test-page',
            component: () => import('@/views/Test.vue')
        },

    ]
})

export default router
