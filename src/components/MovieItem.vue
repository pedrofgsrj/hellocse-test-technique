<template>
  <div class="relative h-full rounded-md">
    <img v-if="moviePoster" :src="moviePoster" :alt="movie.title" class="rounded-[inherit]" />
    <div class="absolute bottom-0 w-full rounded-b-[inherit] bg-slate-950 px-3 py-2">
      {{ movie.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Movie } from "../interfaces/movie";
import { computed } from "vue";

const props = defineProps<{ movie: Movie }>();

const moviePoster = computed<string>(() => {
  if (!props.movie.poster_path) return "";

  return `https://image.tmdb.org/t/p/w342/${props.movie.poster_path}`;
});
</script>
