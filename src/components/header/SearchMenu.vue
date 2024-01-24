<template>
    <div class="col-sm-8 col-4 py-0">
      <div class="d-none d-sm-block">
        <div
          class="header__searchbar input-group align-items-center border rounded-pill">
          <span class="px-2"><i style="cursor: pointer;" @click="changePageToSearch" class="fa-solid fa-magnifying-glass"></i></span>
          <input
            type="text"
            class="form-control form-control-sm border-0 rounded-pill"
            placeholder="Search Recipe"
            v-model="data.search"
            @keyup="displayData"
            @keyup.enter="changePageToSearch"
          />
        </div>
      </div>
      <div  class="d-block d-sm-none border-end text-end px-3">
        <i style="cursor: pointer;" @click="changePageToSearch" class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const data = reactive({
  search: ""
})

const displayData = () => {
  console.log(data.search)
}

const changePageToSearch = () => {
  router.push(`/recipe?search=${data.search}`)
}
</script>