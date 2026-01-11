<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  iconOnly?: boolean
}>()
</script>

<template>
  <button
    class="v-icon-button"
    :class="[
      `v-icon-button--${variant || 'primary'}`,
      `v-icon-button--${size || 'md'}`,
      { 'v-icon-button--icon-only': iconOnly },
    ]"
    :disabled="disabled"
  >
    <span v-if="$slots.icon" class="v-icon-button__icon">
      <slot name="icon" />
    </span>
    <span v-if="$slots.default && !iconOnly" class="v-icon-button__label">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.v-icon-button {
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

.v-icon-button--sm {
  padding: 6px 12px;
  font-size: calc(var(--base-font-size, 16px) * 0.8);
}

.v-icon-button--md {
  padding: 10px 16px;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
}

.v-icon-button--lg {
  padding: 14px 20px;
  font-size: calc(var(--base-font-size, 16px) * 1);
}

.v-icon-button--icon-only.v-icon-button--sm {
  padding: 6px;
}

.v-icon-button--icon-only.v-icon-button--md {
  padding: 10px;
}

.v-icon-button--icon-only.v-icon-button--lg {
  padding: 14px;
}

.v-icon-button--primary {
  background: var(--theme-primary, #6366f1);
  color: white;
}

.v-icon-button--primary:hover:not(:disabled) {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 85%, black);
}

.v-icon-button--secondary {
  background: #1e293b;
  color: white;
}

.v-icon-button--secondary:hover:not(:disabled) {
  background: #0f172a;
}

.v-icon-button--outline {
  background: transparent;
  color: var(--theme-primary, #6366f1);
  border-color: var(--theme-primary, #6366f1);
}

.v-icon-button--outline:hover:not(:disabled) {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 10%, white);
}

.v-icon-button--ghost {
  background: transparent;
  color: #64748b;
}

.v-icon-button--ghost:hover:not(:disabled) {
  background: #f1f5f9;
  color: #1e293b;
}

.v-icon-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.v-icon-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-icon-button__icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.v-icon-button--sm .v-icon-button__icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.v-icon-button--lg .v-icon-button__icon :deep(svg) {
  width: 22px;
  height: 22px;
}
</style>
