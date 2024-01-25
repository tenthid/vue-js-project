<template>
  <web-header></web-header>
  <router-view></router-view>
  <web-footer></web-footer>
</template>

<script setup>
  import WebHeader from "./components/header/WebHeader.vue"
  import WebFooter from "./components/footer/WebFooter.vue"
</script>
