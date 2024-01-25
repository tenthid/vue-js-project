<template>
    <div class="recipe__list-recipe row">
        <div v-for="(recipe, id) in recipes" :key="id" class="col-12 col-lg-3 col-sm-4 position-relative" style="padding-top: 12px; padding-bottom: 12px">
            <router-link class="text-decoration-none" :to="'/recipe/'+recipe.id">
                <div class="card text-decoration-none" style="height: 398px">
                  <img
                    :src="recipe.imageLink"
                    class="card-img-top"
                    alt="Food"
                    height="240"
                    width="285"
                    style="object-fit: cover"
                  />
                  <div class="card-body" style="color: #0a0a0a">
                    <p class="mb-0">{{ recipe.category }}</p>
                    <div class="h-50">
                      <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
                    </div>
                    <p>Recipe By {{ recipe.username }}</p>
                  </div>
                </div>
              </router-link>
                <div @click="like(id)" style="z-index: 99;" class="position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon">
                  <div v-if="recipe.isLike === true">
                    <i style="cursor: pointer;" class="fa-fw fa-solid fa-heart"></i>
                  </div>
                  <div v-else>
                    <i style="cursor: pointer;" class="fa-fw fa-regular fa-heart"></i>
                  </div>
                </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore()

    const props = defineProps({
        recipes: Array
    })
    // defineProps ({
    //     recipes: Array
    // })
    
    const recipes = computed(() => {
        return props.recipes
    })

    // const recipes = props.recipes

    // watch(props, (newValue, oldValue) => {
    //   recipes.value = props.recipes
    //   console.log(props.recipes)
    // })

    const like = (id) => {
      recipes.value[id].isLike = !recipes.value[id].isLike
      // console.log(id)
      // localStorage.removeItem('likedContent')
      if (recipes.value[id].isLike) {
        // console.log('like')
        store.dispatch('recipe/addLike', recipes.value[id].id)
      } else {
        // console.log('dislike')
        store.dispatch('recipe/removeLike', recipes.value[id].id)
      }
    }

    onMounted(async () => {
      await store.dispatch('recipe/getLike')
      const likedContent = await store.state.recipe.like
      // console.log(recipes)
      recipes.value.forEach(recipeItem => {
        recipeItem.isLike = likedContent.some(likedItem => likedItem.id === recipeItem.id);
      });
    })
</script>