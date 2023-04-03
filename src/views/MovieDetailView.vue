<template>
  <main class="mx-auto flex max-w-screen-lg flex-wrap items-start gap-[5%] px-8 pb-8 pt-4">
    <!-- Movie cover -->
    <MovieItem
      v-if="movie"
      :poster="movie.poster_path || ''"
      :poster-sizes="imageSizeMap"
      class="w-1/3 min-w-[200px] max-w-md flex-1 rounded-md border border-slate-800 shadow"
    />

    <div class="min-w-[15rem] max-w-lg flex-1 grow-[2]">
      <!-- Movie details -->
      <dl v-if="movie" class="mb-8">
        <dt class="sr-only">Title</dt>
        <dd class="text-4xl font-medium leading-tight">{{ movie.title }}</dd>
        <dt class="sr-only">Release date</dt>
        <dd class="mb-4 text-lg opacity-90">
          {{ new Date(movie.release_date).toLocaleDateString(undefined, { dateStyle: "short" }) }}
        </dd>

        <dt class="sr-only">Overview</dt>
        <dd class="mb-10">{{ movie.overview }}</dd>

        <div class="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt class="text-xs font-medium uppercase tracking-wide opacity-80">Genres</dt>
            <dd>{{ movie.genres?.map(({ name }) => name).join(", ") }}</dd>
          </div>

          <div class="shrink-0">
            <dt class="text-xs font-medium uppercase tracking-wide opacity-80">Budget</dt>
            <dd>
              {{
                movie.budget.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD"
                })
              }}
            </dd>
          </div>
        </div>
      </dl>

      <!-- Other popular movies -->
      <aside>
        <p>Other popular movies</p>
        <ul class="flex gap-4 overflow-x-auto p-4">
          <li v-for="otherMovie in otherMovies" :key="otherMovie.id" class="w-20 shrink-0">
            <router-link :to="`/movie/${otherMovie.id}`" class="h-full">
              <MovieItem :poster="otherMovie.poster_path || ''" :poster-sizes="imageSizeMap" />
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { getMovieDetails, getPopularMovies } from "../api";
import { Movie, MovieDetail } from "../interfaces/movie";
import { onMounted, ref, watchEffect } from "vue";
import MovieItem from "../components/MovieItem.vue";
import { getImageSizeMap } from "../utils";

const props = defineProps<{ movieId: string }>();

const isLoading = ref(false);
const movie = ref<MovieDetail | undefined>();
const otherMovies = ref<Movie[]>([]);

const imageSizeMap = getImageSizeMap();

onMounted(async () => {
  watchEffect(async () => {
    await loadMovieDetails(props.movieId);
    await loadOtherMovies();
  });
});

const loadMovieDetails = async (movieId: string) => {
  isLoading.value = true;

  try {
    movie.value = await getMovieDetails(movieId);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const loadOtherMovies = async () => {
  try {
    const { movies } = await getPopularMovies();
    otherMovies.value = movies.filter(({ id }) => id !== movie.value?.id);
  } catch (error) {
    console.log(error);
  }
};
</script>
