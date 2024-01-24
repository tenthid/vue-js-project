import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import HomePage from "./components/pages/HomePage.vue"
import DetailPage from "./components/pages/DetailPage.vue"
import UserPage from "./components/pages/UserPage.vue"
import NewRecipePage from "./components/pages/NewRecipePage.vue"
import EditRecipePage from "./components/pages/EditRecipePage.vue"
import NotFoundPage from "./components/pages/NotFoundPage.vue"
import RecipeSearchPage from "./components/pages/RecipeSearchPage.vue"
import Cookies from "js-cookie"
import { store } from "./store/index"
    
    export const routes = [
        {
            path: "/new-recipe",
            name: "newRecipePage",
            component: NewRecipePage,
            beforeEnter: (to, from, next) => {
                const loginStatus = store.state.auth.isLogin;
                loginStatus? next() : next('/login')
            }
        },
        {
            path: "/recipe/edit/:id",
            name: "editRecipePage",
            component: EditRecipePage,
            beforeEnter: (to, from, next) => {
                const loginStatus = store.state.auth.isLogin;
                if (loginStatus) {
                    const recipeId  = to.params.id
                    const userId = Cookies.get("UID")
                    const allRecipe = store.state.recipe.recipes
                    for (let key in allRecipe) {
                        if (allRecipe[key].id === recipeId) {
                            if (allRecipe[key].userId === userId) {
                                next()
                            } else {
                                next('/')
                            }
                        } else {
                            console.log("recipe tidak ditmukan")
                        }
                    }
                } else {
                    next('/login')
                }
                // loginStatus? next() : next('/login')
            }
        },
        {
            path: "/user/:component", 
            name:"userPage", 
            component: UserPage,
            beforeEnter: (to, from, next) => {
                const loginStatus = store.state.auth.isLogin;
                loginStatus? next() : next('/login')
            } 
        },
        {path: "/", name: "homePage", component: HomePage},
        {path: "/recipe/:id", name: "recipe", component: DetailPage},
        {
            path: "/signup", 
            name: "signup", 
            component: SignupPage,
            beforeEnter: (to, from, next) => {
                const loginStatus = store.state.auth.isLogin;
                loginStatus? next("/") : next()
            }
        },
        {
            path: "/login", 
            name: "login", component: LoginPage,
            beforeEnter: (to, from, next) => {
                const loginStatus = store.state.auth.isLogin;
                loginStatus? next("/") : next()
            } 
        },
        {path:"/recipe", name:"recipeSearch", component: RecipeSearchPage},
        {path: '/:catchAll(.*)', name:"notFound", component: NotFoundPage}
]