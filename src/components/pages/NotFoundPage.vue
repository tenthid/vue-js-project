<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
        <div class="card" style="height: fit-content;">
            <div class="card-header">
                <h1 class="text-center" style="color: black;">Nyari paan?</h1>
            </div>
            <div class="card-body flex-column d-flex align-items-center">
                <p><b>Ga ada halaman yang namanya kek gini</b></p>
                <router-link to="/" class="btn btn-outline-primary rounded-pill" style="font-size: 20px; text-decoration: none;">Balik rumah</router-link>
                <button @click="debug()">acak</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore()
const userData = computed(() => {
    return store.state.auth.userLogin
})

const debug = () => {
    console.log(userData.name)
}
</script>