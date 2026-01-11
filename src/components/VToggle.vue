<script setup lang="ts">
defineProps<{
  label?: string
  modelValue?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <label class="v-toggle" :class="{ 'v-toggle--disabled': disabled }">
    <input
      type="checkbox"
      class="v-toggle__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span class="v-toggle__slider" />
    <span v-if="label" class="v-toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.v-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.v-toggle--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.v-toggle__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.v-toggle__slider {
  width: 44px;
  height: 24px;
  background: #d1d5db;
  border-radius: 9999px;
  position: relative;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.v-toggle__slider::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.v-toggle__input:checked + .v-toggle__slider {
  background: var(--theme-primary, #6366f1);
}

.v-toggle__input:checked + .v-toggle__slider::after {
  transform: translateX(20px);
}

.v-toggle__input:focus + .v-toggle__slider {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary, #6366f1) 15%, transparent);
}

.v-toggle__label {
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  color: #374151;
}
</style>
