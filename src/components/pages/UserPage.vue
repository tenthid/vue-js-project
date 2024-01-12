<template>
    <div class="container-md my-5 py-5">
        <div class="row">
            <user-menu @changeComponent="$router.push($event)">
                <div class="col-lg-9">
                    <component :is="component[getRoute]"></component>
                </div>
            </user-menu>
        </div>
    </div>
</template>

<script setup>
    import UserMenu from "../user/UserMenu.vue"
    import FavoriteRecipe from "../user/FavoriteRecipe.vue"
    import PersonalInfo from "../user/PersonalInfo.vue"
    import UserRecipe from "../user/UserRecipe.vue"
    import { useRoute } from "vue-router"
    import { computed } from "vue"

    const route = useRoute()

    const component = {
        "favorite-recipe": FavoriteRecipe,
        "personal-info": PersonalInfo,
        "user-recipe": UserRecipe,
    }
    
    const getRoute = computed (() => {
        return route.params.component
    })

    console.log(route.params.component)
</script>