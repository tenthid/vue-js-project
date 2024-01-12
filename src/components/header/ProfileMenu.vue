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
            <li class="dropdown-item">
              <router-link class="text-decoration-none" to="/user" style="color: #1e2125;">Profile</router-link>
            </li>
            <li class="dropdown-item">Favorited Recipes</li>
            <li class="dropdown-item">My Recipes</li>
            <li><hr class="dropdown-divider" /></li>
            <li @click="logout" class="dropdown-item">Logout</li>
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