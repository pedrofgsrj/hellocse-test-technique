<template>
  <main class="overflow-y-auto px-8 py-4">
    <ul v-if="!isLoading" class="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-x-6 gap-y-4 p-4">
      <li v-for="movie in movieList" :key="movie.id">
        <MovieItem :movie="movie" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MovieItem from "../components/MovieItem.vue";
import { Movie } from "../interfaces/movie";
import { getPopularMovies } from "../api";

const movieList = ref<Movie[]>([]);
const isLoading = ref(false);

onMounted(() => {
  loadMovies();
});

const loadMovies = async () => {
  isLoading.value = true;

  try {
    movieList.value = await getPopularMovies();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
