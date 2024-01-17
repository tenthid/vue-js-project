<template>
    <div
      class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none"
      style="text-align: right">
      <i class="fa-solid fa-user" style="color: #4c4ddc"></i>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown">
            My Profile
          </a>
          <ul class="dropdown-menu">
            <router-link class="text-decoration-none dropdown-item" to="/user/personal-info" style="color: #1e2125;">Profile</router-link>
            <router-link class="text-decoration-none dropdown-item" to="/user/favorite-recipe" style="color: #1e2125;">Favoriteed Recipe</router-link>
            <router-link class="text-decoration-none dropdown-item" to="/user/user-recipe" style="color: #1e2125;">My Recipe</router-link>
            <li><hr class="dropdown-divider" /></li>
            <li style="cursor: pointer;" @click="logout" class="dropdown-item">Logout</li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore()
    const router = useRouter()

    const logout = () => {
        store.commit("auth/setUserLogout")
        router.push("/")
    }
</script>