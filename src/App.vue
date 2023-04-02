<template>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "./components/AppHeader.vue";
</script>
