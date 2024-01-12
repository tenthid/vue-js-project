import LoginPage from "./components/pages/LoginPage.vue"
import SignupPage from "./components/pages/SignupPage.vue"
import HomePage from "./components/pages/HomePage.vue"
import DetailPage from "./components/pages/DetailPage.vue"
import UserPage from "./components/pages/UserPage.vue"

export const routes = [
    {path: "/user/:component", name:"userPage", component: UserPage},
    {path: "/user", name:"userPage", component: UserPage},
    {path: "/", name: "homePage", component: HomePage},
    {path: "/recipe/:id", name: "recipe", component: DetailPage},
    {path: "/signup", name: "signup", component: SignupPage},
    {path: "/login", name: "login", component: LoginPage}
]