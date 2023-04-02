<template>
  <div class="relative h-full rounded-md">
    <img :src="poster" :alt="title" class="rounded-[inherit]" />
    <div v-if="title" class="absolute bottom-0 w-full rounded-b-[inherit] bg-slate-950/70 px-3 py-2">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  poster: string;
  title?: string;
}

withDefaults(defineProps<Props>(), { title: "" });
</script>
