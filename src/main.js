import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { createApp } from 'vue'
import { store } from "./store/index";
import App from './App.vue'
import "bootstrap/dist/js/bootstrap"
    
const router = createRouter({
   history: createWebHashHistory(),routes,
   scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
    }
})

await store.dispatch("recipe/getLike")
await store.dispatch("auth/checkCookies")
await store.dispatch("recipe/getRecipeData")

createApp(App).use(router).use(store).mount('#app')