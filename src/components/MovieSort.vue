<template>
  <label class="flex items-center gap-2">
    Sort by:
    <select class="rounded bg-black/50 p-1" v-model="selected">
      <option v-for="(option, index) in sortOptions" :key="option.value" :value="index" class="bg-slate-950">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
export enum SortTypes {
  POPULARITY = "POPULARITY",
  RATING = "RATING"
}

export interface SortOption {
  label: string;
  value: SortTypes;
  asc: boolean;
}
</script>

<script lang="ts" setup>
import { computed, ref } from "vue";

export interface Props {
  modelValue?: SortOption;
}

const sortOptions: SortOption[] = [
  { label: "Most popular", value: SortTypes.POPULARITY, asc: false },
  { label: "Least popular", value: SortTypes.POPULARITY, asc: true },
  { label: "Best rated", value: SortTypes.RATING, asc: false },
  { label: "Worst rated", value: SortTypes.RATING, asc: true }
];

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const selected = computed({
  get() {
    const index = sortOptions.findIndex((opt) => opt.label === props.modelValue?.label);
    return index !== -1 ? index : 0;
  },
  set(optionIndex) {
    emit("update:modelValue", sortOptions[optionIndex]);
  }
});
</script>
