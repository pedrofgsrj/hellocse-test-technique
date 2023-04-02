<template>
  <div class="grid h-full grid-rows-[auto_1fr]">
    <AppHeader />
    <div class="overflow-y-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppHeader from "./components/AppHeader.vue";
</script>
