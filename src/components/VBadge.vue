<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
}>()
</script>

<template>
  <span class="v-badge" :class="`v-badge--${variant || 'default'}`">
    <slot />
  </span>
</template>

<style scoped>
.v-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: calc(var(--base-font-size, 16px) * 0.75);
  font-weight: 500;
  border-radius: 9999px;
}

.v-badge--default {
  background: #f1f5f9;
  color: #475569;
}

.v-badge--success {
  background: #dcfce7;
  color: #166534;
}

.v-badge--warning {
  background: #fef3c7;
  color: #92400e;
}

.v-badge--error {
  background: #fee2e2;
  color: #b91c1c;
}

.v-badge--info {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 15%, white);
  color: var(--theme-primary, #6366f1);
}
</style>
