<template>
  <main class="overflow-y-auto px-8 py-4">
    <ul class="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-x-6 gap-y-4 p-4">
      <li v-for="movie in movieList" :key="movie.id">
        <MovieItem :movie="movie" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
import data from "../../movie-list-example.json";
import MovieItem from "../components/MovieItem.vue";
import { Movie } from "../interfaces/movie";

const movieList: Movie[] = data.results;
</script>
