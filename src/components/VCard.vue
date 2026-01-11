<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="v-card">
    <div v-if="title" class="v-card__header">
      <h3 class="v-card__title">{{ title }}</h3>
      <p v-if="description" class="v-card__description">{{ description }}</p>
    </div>
    <div class="v-card__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.v-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.v-card__header {
  margin-bottom: 16px;
}

.v-card__title {
  font-size: calc(var(--base-font-size, 16px) * 1);
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px;
}

.v-card__description {
  font-size: calc(var(--base-font-size, 16px) * 0.875);
  color: #64748b;
  margin: 0;
}

.v-card__content {
  color: #475569;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
}

.v-card__content p {
  margin: 0 0 12px;
}

.v-card__content p:last-child {
  margin-bottom: 0;
}
</style>
