<template>
  <div class="grid h-full grid-rows-[auto_minmax(0,1fr)] bg-slate-900 text-white">
    <AppHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "./components/AppHeader.vue";
</script>
