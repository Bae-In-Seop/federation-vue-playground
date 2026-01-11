<script setup lang="ts">
defineProps<{
  label?: string
  type?: string
  placeholder?: string
  error?: string
  modelValue?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="v-input-wrapper" :class="{ 'v-input-wrapper--error': error }">
    <label v-if="label" class="v-input__label">{{ label }}</label>
    <input
      class="v-input"
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="v-input__error">{{ error }}</span>
  </div>
</template>

<style scoped>
.v-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.v-input__label {
  font-size: calc(var(--base-font-size, 16px) * 0.875);
  font-weight: 500;
  color: #374151;
}

.v-input {
  padding: 10px 14px;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #1f2937;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.v-input:focus {
  outline: none;
  border-color: var(--theme-primary, #6366f1);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary, #6366f1) 15%, transparent);
}

.v-input::placeholder {
  color: #9ca3af;
}

.v-input-wrapper--error .v-input {
  border-color: #ef4444;
}

.v-input-wrapper--error .v-input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.v-input__error {
  font-size: calc(var(--base-font-size, 16px) * 0.8);
  color: #ef4444;
}
</style>
