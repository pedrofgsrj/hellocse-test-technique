<template>
  <div class="relative h-full rounded-md shadow-sm">
    <img
      :src="moviePoster"
      loading="lazy"
      :srcset="srcSet"
      sizes="(min-width: 66rem) 33vw,
             (min-width: 44rem) 50vw,
             100vw"
      :alt="title"
      class="h-full rounded-[inherit] object-cover"
    />
    <div v-if="title" class="absolute bottom-0 w-full rounded-b-[inherit] bg-slate-950/70 px-3 py-2">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { getImageSizes } from "../utils";

export interface Props {
  poster: string;
  posterSizes: Record<string, string>;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), { title: "" });

const moviePoster = computed<string>(() => {
  if (!props.poster) return "";

  const smallestSizeUrl = Object.values(props.posterSizes)[0];
  return `${smallestSizeUrl}${props.poster}`;
});

const srcSet = computed<string>(() => {
  if (!props.poster) return "";
  return getImageSizes(props.posterSizes, props.poster).join(", ");
});
</script>
