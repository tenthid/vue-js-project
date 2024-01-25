<template>
    <div v-if="detailStatus" class="col-12 col-sm-8" >
        <recipe-description ></recipe-description >
        <recipe-ingredients></recipe-ingredients>
        <recipe-direction></recipe-direction>
    </div>
</template>

<script setup>
    import RecipeDescription from "./RecipeDescription.vue"
    import RecipeIngredients from "./RecipeIngredients.vue"
    import RecipeDirection from "./RecipeDirection.vue"
    import { onMounted, ref } from "vue";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";

    const store = useStore()
    const route = useRoute()
    const detailStatus = ref(false)

    onMounted(async() => {
        await store.dispatch("recipe/getRecipeDetail", route.params.id)
        detailStatus.value = true
        // console.log("detail dapet")
    })
</script>