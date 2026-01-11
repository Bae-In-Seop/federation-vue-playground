<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
</script>

<template>
  <button
    class="v-button"
    :class="[
      `v-button--${variant || 'primary'}`,
      `v-button--${size || 'md'}`,
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.v-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid transparent;
}

.v-button--sm {
  padding: 6px 12px;
  font-size: calc(var(--base-font-size, 16px) * 0.8);
}

.v-button--md {
  padding: 10px 18px;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
}

.v-button--lg {
  padding: 14px 24px;
  font-size: calc(var(--base-font-size, 16px) * 1);
}

.v-button--primary {
  background: var(--theme-primary, #6366f1);
  color: white;
}

.v-button--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 85%, black);
}

.v-button--secondary {
  background: #1e293b;
  color: white;
}

.v-button--secondary:hover:not(:disabled) {
  background: #0f172a;
}

.v-button--outline {
  background: transparent;
  color: var(--theme-primary, #6366f1);
  border-color: var(--theme-primary, #6366f1);
}

.v-button--outline:hover:not(:disabled) {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 10%, white);
}

.v-button--ghost {
  background: transparent;
  color: #64748b;
}

.v-button--ghost:hover:not(:disabled) {
  background: #f1f5f9;
  color: #1e293b;
}

.v-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
