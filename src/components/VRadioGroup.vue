<script setup lang="ts">
interface RadioOption {
  value: string
  label: string
}

defineProps<{
  name: string
  options: RadioOption[]
  modelValue?: string
  direction?: 'horizontal' | 'vertical'
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="v-radio-group" :class="`v-radio-group--${direction || 'vertical'}`">
    <label
      v-for="option in options"
      :key="option.value"
      class="v-radio"
    >
      <input
        type="radio"
        class="v-radio__input"
        :name="name"
        :value="option.value"
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
      />
      <span class="v-radio__custom" />
      <span class="v-radio__label">{{ option.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.v-radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.v-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.v-radio {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.v-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.v-radio__custom {
  width: 20px;
  height: 20px;
  border: 2px solid #d1d5db;
  border-radius: 50%;
  position: relative;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.v-radio__custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  background: var(--theme-primary, #6366f1);
  border-radius: 50%;
  transition: transform 0.15s ease;
}

.v-radio__input:checked + .v-radio__custom {
  border-color: var(--theme-primary, #6366f1);
}

.v-radio__input:checked + .v-radio__custom::after {
  transform: translate(-50%, -50%) scale(1);
}

.v-radio__input:focus + .v-radio__custom {
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary, #6366f1) 15%, transparent);
}

.v-radio__label {
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  color: #374151;
}
</style>
