<template>
  <main class="flex flex-col gap-y-6 overflow-y-auto px-8 pb-8 pt-4">
    <header class="mx-4 flex flex-wrap justify-between gap-8">
      <input
        v-model="searchText"
        type="search"
        placeholder="Search movie..."
        class="max-w-sm flex-1 rounded bg-black/50 px-4 py-2"
      />

      <MovieSort v-model="sort" class="shrink-0" />
    </header>

    <ul v-if="!isLoading" class="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-x-6 gap-y-4 p-4">
      <li v-for="movie in displayedMovies" :key="movie.id">
        <router-link :to="`/movie/${movie.id}`">
          <MovieCover :poster="movie.poster_path || ''" :poster-sizes="imageSizeMap" :title="movie.title" />
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
import { computed, onMounted, ref, watchEffect } from "vue";
import MovieCover from "../components/MovieCover.vue";
import MovieSort, { SortOption, SortTypes } from "../components/MovieSort.vue";
import { Movie } from "../interfaces/movie";
import { getPopularMovies, ITEMS_PER_PAGE } from "../api";
import { getImageSizeMap } from "../utils";

const isLoading = ref(false);
const movieList = ref<Movie[]>([]);
const totalCount = ref(0);
const currentPage = ref(1);
const searchText = ref("");
const sort = ref<SortOption>();

const imageSizeMap = getImageSizeMap();

onMounted(() => {
  watchEffect(() => {
    loadMovies(currentPage.value);
  });
});

const displayedMovies = computed<Movie[]>(() => {
  let list = movieList.value;

  const search = searchText.value.trim();
  if (search) {
    list = movieList.value.filter(({ title }) => title.toLowerCase().includes(search.toLowerCase()));
  }

  return sortList(list, sort.value);
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

const sortList = (list: Movie[], sortOption?: SortOption): Movie[] => {
  if (!sortOption) return list;

  const sortKey = sortOption.value === SortTypes.RATING ? "vote_average" : "popularity";

  return list.sort((a, b) => {
    if (sortOption.asc) {
      return a[sortKey] - b[sortKey];
    } else {
      return b[sortKey] - a[sortKey];
    }
  });
};
</script>
