<template>
    <main>
        <div class="container-md my-5 py-5">
            <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
        </div>
    </main>
</template>

<script setup>
    import RecipeForm from '../recipeForm/RecipeForm.vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { onMounted, ref, computed } from 'vue';

    const detailData = ref()
    const isLoading = ref(false)
    const store = useStore()
    const route = useRoute()

    onMounted(async () => {
        isLoading.value = true
        try {
            await store.dispatch("recipe/getRecipeDetail", route.params.id)
            detailData.value = computed(() => {
                return store.state.recipe.recipeDetail
            })
        } catch(err) {
            console.log(err)
        }
        isLoading.value = false
    })
</script>