<template>
  <main class="flex flex-col gap-y-6 overflow-y-auto px-8 pb-8 pt-4">
    <ul v-if="!isLoading" class="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-x-6 gap-y-4 p-4">
      <li v-for="movie in movieList" :key="movie.id">
        <router-link :to="`/movie/${movie.id}`">
          <MovieItem :poster="getMoviePoster(movie.poster_path)" :title="movie.title" />
        </router-link>
      </li>
    </ul>

    <vue-awesome-paginate
      v-if="totalCount > ITEMS_PER_PAGE"
      v-model="currentPage"
      :total-items="totalCount"
      :items-per-page="ITEMS_PER_PAGE"
      :max-pages-shown="5"
      :show-ending-buttons="true"
      :show-breakpoint-buttons="false"
      class="self-center"
    >
      <template #prev-button>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="12" height="12" viewBox="0 0 24 24">
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>

      <template #next-button>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="12" height="12" viewBox="0 0 24 24">
            <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
          </svg>
        </span>
      </template>
    </vue-awesome-paginate>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import MovieItem from "../components/MovieItem.vue";
import { Movie } from "../interfaces/movie";
import { getPopularMovies, ITEMS_PER_PAGE } from "../api";
import { getMoviePoster } from "../utils";

const isLoading = ref(false);
const movieList = ref<Movie[]>([]);
const totalCount = ref(0);
const currentPage = ref(1);

onMounted(() => {
  watchEffect(() => {
    loadMovies(currentPage.value);
  });
});

/**
 * Loads the movie list and handles the loading state
 */
const loadMovies = async (page: number) => {
  isLoading.value = true;

  try {
    const { movies, totalItems } = await getPopularMovies(page);
    movieList.value = movies;
    totalCount.value = totalItems;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
