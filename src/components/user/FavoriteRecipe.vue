<template>
    <ul class="list-group">
      <li class="list-group-item">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">Favorite Recipe</p>
          <p class="my-0 text-secondary">Save the recipe that you loved here</p>
        </div>
      </li>
      <li class="list-group-item">
        <p class="mt-2 mb-4 fs-5 fw-semibold">Recipe</p>
        <div class="row">
          <!-- User Recipe Card -->
          <user-recipe-card v-for="recipe in likedRecipes" :recipeId="recipe.id" :recipe="recipe" ></user-recipe-card>
        </div>
      </li>
    </ul>
</template>

<script setup>
import { store } from '@/store';
import UserRecipeCard from './UserRecipeCard.vue';
const recipes = store.state.recipe.recipes
const localLikedRecipes = store.state.recipe.like

const likedRecipes = []

localLikedRecipes.forEach(likedRecipe => {
  const matchingRecipe = recipes.find(recipe => recipe.id === likedRecipe.id);
  if (matchingRecipe) {
    likedRecipes.push(matchingRecipe);
  }
});

console.log(likedRecipes)

</script>