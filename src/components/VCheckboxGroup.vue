<script setup lang="ts">
interface CheckboxOption {
  value: string
  label: string
}

const props = defineProps<{
  options: CheckboxOption[]
  modelValue?: string[]
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const handleChange = (value: string, checked: boolean) => {
  const current = props.modelValue || []
  const newValues = checked
    ? [...current, value]
    : current.filter((v) => v !== value)
  emit('update:modelValue', newValues)
}
</script>

<template>
  <div class="v-checkbox-group" :class="`v-checkbox-group--${direction || 'vertical'}`">
    <label
      v-for="option in options"
      :key="option.value"
      class="v-checkbox"
    >
      <input
        type="checkbox"
        class="v-checkbox__input"
        :value="option.value"
        :checked="modelValue?.includes(option.value)"
        @change="handleChange(option.value, ($event.target as HTMLInputElement).checked)"
      />
      <span class="v-checkbox__custom">
        <svg viewBox="0 0 24 24" class="v-checkbox__check">
          <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="v-checkbox__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.v-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-checkbox-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.v-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.v-checkbox__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.v-checkbox__custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  position: relative;
  transition: all 0.15s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-checkbox__check {
  width: 14px;
  height: 14px;
  color: white;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.15s ease;
}

.v-checkbox__input:checked + .v-checkbox__custom {
  background: var(--theme-primary, #6366f1);
  border-color: var(--theme-primary, #6366f1);
}

.v-checkbox__input:checked + .v-checkbox__custom .v-checkbox__check {
  opacity: 1;
  transform: scale(1);
}

.v-checkbox__input:focus + .v-checkbox__custom {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary, #6366f1) 15%, transparent);
}

.v-checkbox__label {
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  color: #374151;
}
</style>
