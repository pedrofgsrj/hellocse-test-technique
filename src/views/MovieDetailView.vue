<template>
  <main class="mx-auto flex max-w-screen-lg flex-wrap items-start gap-[5%] px-8 pb-8 pt-4">
    <img
      v-if="moviePoster"
      :src="moviePoster"
      :alt="movie?.title"
      class="w-1/3 min-w-[200px] max-w-md flex-1 rounded-md"
    />

    <dl v-if="movie" class="min-w-[15rem] max-w-lg flex-1 grow-[2]">
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
  </main>
</template>

<script lang="ts" setup>
import { getMovieDetails } from "../api";
import { MovieDetail } from "../interfaces/movie";
import { computed, onMounted, ref } from "vue";

const props = defineProps<{ movieId: string }>();

const isLoading = ref(false);
const movie = ref<MovieDetail | undefined>();

onMounted(() => {
  loadMovieDetails();
});

const loadMovieDetails = async () => {
  isLoading.value = true;

  try {
    movie.value = await getMovieDetails(props.movieId);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const moviePoster = computed<string>(() => {
  if (!movie.value?.poster_path) return "";

  return `https://image.tmdb.org/t/p/w500${movie.value?.poster_path}`;
});
</script>
