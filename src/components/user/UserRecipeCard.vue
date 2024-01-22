<template>
    <div class="col-md-6 col-12 my-2">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <div>
              <p class="mb-0">{{ recipe.category }}</p>
              <div class="h-50">
                <h4 class="fs-5 mb-0">{{ recipe.name }}</h4>
              </div>
              <slot></slot>
            </div>
            <div class="d-flex">
              <img :src="recipe.imageLink" alt="" width="90" height="80" class="rounded" style="object-fit: cover">
            </div>
          </div>
          <div v-if="recipeEdit === true" class="d-flex justify-content-between mt-3 pt-3 border-top">
            <button @click="deleteRecipe(id)" class="btn delete-btn px-3 py-2 rounded-pill">
              {{ buttonName[0] }}
            </button>
            <button @click="editRecipe(id)" class="btn edit-btn px-3 py-2 rounded-pill">
              {{ buttonName[1] }}
            </button>
          </div>
          <div v-else class="d-flex justify-content-between mt-3 pt-3 border-top">
            <router-link :to="'/recipe/'+recipe.id" class="btn btn-outline-primary w-100">View Recipe</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const store = useStore()
  const router = useRouter()

  defineProps({
    recipe: {type: Object, recquire: true},
    buttonName: {type: Array, recquire: true},
    id: {type: String, recquire: ""},
    recipeId: {type: String, recquire: ""},
    recipeEdit: {type: Boolean, recquire: false}
  })

    const editRecipe = (id) => {
      router.replace(`/recipe/edit/${id}`)
    }

    const deleteRecipe = async (id) => {
      await store.dispatch("recipe/deleteRecipe", id)
    }
</script>