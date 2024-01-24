<template>
    <div class="container-md my-5 py-5">
        <div class="recipe__title text-center">
            <h2>{{ paramDefined? `Result for "${searchParam}"` : 'All recipe' }}</h2>
            <hr>
        </div>
        <div v-if="recipeFound">
            <recipe-list :recipes="recipes"></recipe-list>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center" style="height: 70vh;">
            <h2>Recipe not found</h2>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch} from 'vue';
    import { store } from '@/store';
    import { useRoute } from 'vue-router';
    import RecipeList from '../recipe/RecipeList.vue';

    const route = useRoute()

    const allRecipe = store.state.recipe.recipes
    const paramDefined = ref(false)
    const searchParam = ref(route.query.search)
    const recipes = ref([...allRecipe])
    const recipeFound = ref(true)

    watch(route, (newValue, oldValue) => {
        searchParam.value = route.query.search
        searchResult()
    })

    const searchResult = () => {
        console.log(searchParam.value)
            // const getParam = route.query.search
            if (searchParam.value !== undefined && searchParam.value !== '') {
                paramDefined.value = true
                // searchParam.value = getParam
                recipes.value = allRecipe.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchParam.value.toLowerCase())
                );
                console.log(recipes.value)
                if (recipes.value.length === 0) {
                    console.log('recipe ga ada')
                    recipeFound.value = false
                } else {
                    recipeFound.value = true
                }
            } else {
                paramDefined.value = false
                recipes.value = allRecipe
                recipeFound.value = true
                console.log("kondisi papramdefined false", recipes.value)
            }
    }

    onMounted(async () => {
        try {
            await searchResult()
        } catch(err) {
            console.log(err)
        }
    })
</script>