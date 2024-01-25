<template>
    <div class="col-sm-8 col-4 py-0">
      <div class="d-none d-sm-block">
        <div
          class="header__searchbar input-group align-items-center border rounded-pill">
          <span class="px-2"><i style="cursor: pointer;" @click="changePageToSearch()" class="fa-solid fa-magnifying-glass"></i></span>
          <input
            type="text"
            class="form-control form-control-sm border-0 rounded-pill"
            placeholder="Search Recipe"
            v-model="data.search"
            @keyup.enter="changePageToSearch()"
          />
        </div>
      </div>
      <div  class="d-block d-sm-none border-end text-end px-3">
        <i @click="modalSearchControll()" class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
    <teleport to="body">
      <search-modal v-if="modalSearchOpen" v-model="data.search" :modalTopPosition="modalTopPosition" @mobileSearchBtn="() => {modalSearchControll(); changePageToSearch();}" @mobileModalClosebtn="modalSearchControll()" @mobileSearchEnter="() => {changePageToSearch(); modalSearchControll();}"></search-modal>
    </teleport>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchModal from '../modal/SearchModal.vue';

const router = useRouter()

const data = reactive({
  search: ""
})

const modalSearchOpen = ref(false)
const modalTopPosition = ref()

const modalSearchControll = () => {
  modalSearchOpen.value = !modalSearchOpen.value
  modalTopPosition.value = window.scrollY
  // console.log(modalTopPosition.value)
  if (modalSearchOpen.value) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
}

const changePageToSearch = () => {
  router.push(`/recipe?search=${data.search}`)
}
</script>