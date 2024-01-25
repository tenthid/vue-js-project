<template>
    <div class="modal" :style="{ top: props.modalTopPosition + 'px'}">
        <div class="modal-body">
          <div
          class="input-group align-items-center border rounded-pill bg-light">
          <span class="px-2"><i style="cursor: pointer;" @click="$emit('mobileSearchBtn')" class="fa-solid fa-magnifying-glass"></i></span>
          <input
            type="text"
            class="form-control form-control-sm border-0 rounded-pill"
            placeholder="Search Recipe"
            @keyup.enter="$emit('mobileSearchEnter')"
            @input="$emit('update:modelValue', $event.target.value)"
            :value="modelValue"
          />
          <span class="px-2"><i class="fa-solid fa-xmark" @click="$emit('mobileModalClosebtn')"></i></span>
        </div>
          <!-- <button @click="modalSearchControll">close</button> -->
        </div>
      </div>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps({
      modalTopPosition: Number,
      modelValue: String
    })

    const modalTopPosition = computed(() => {
      return props.modalTopPosition
    })
    
</script>

<style scoped>
    .modal {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }

  .modal-body {
    text-align: center;
    padding: 20px;
    width: fit-content;
    height: fit-content;
  }
</style>