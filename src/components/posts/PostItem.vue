<template>
  <AppCard>
    <h5 class="card-title">{{ title }}</h5>
    <p class="card-text">
      {{ content }}
    </p>
    <p class="text-muted">{{ createdDate }}</p>
    <template #footer>
      <div class="d-flex flex-row-reverse">
        <button class="btn p-1" @click.stop="$emit('modal')">
          <i class="bi bi-apple"></i>
        </button>
        <button class="btn p-1" @click.stop="$emit('preview')">
          <i class="bi bi-activity"></i>
        </button>
      </div>
    </template>
  </AppCard>
</template>

<script setup>
import { inject, computed } from 'vue';
import AppCard from '../app/AppCard.vue';
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: [String, Date, Number],
  },
});
defineEmits(['modal', 'preview']);
const dayjs = inject('dayjs');
const createdDate = computed(() => dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'))
</script>

<style lang="scss" scoped>

</style>