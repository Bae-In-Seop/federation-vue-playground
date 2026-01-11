<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const close = () => {
  emit('update:modelValue', false)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

watch(() => props.modelValue, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="v-modal-overlay" @click="close">
        <div class="v-modal" @click.stop>
          <div v-if="title" class="v-modal__header">
            <h3 class="v-modal__title">{{ title }}</h3>
            <button class="v-modal__close" @click="close">×</button>
          </div>
          <div class="v-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="v-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.v-modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.v-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
}

.v-modal__title {
  font-size: calc(var(--base-font-size, 16px) * 1.125);
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.v-modal__close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  color: #64748b;
  font-size: calc(var(--base-font-size, 16px) * 1.5);
  transition: all 0.15s ease;
}

.v-modal__close:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.v-modal__body {
  padding: 24px;
  overflow-y: auto;
  font-size: calc(var(--base-font-size, 16px) * 0.95);
  color: #475569;
  line-height: 1.6;
}

.v-modal__body p {
  margin: 0 0 12px;
}

.v-modal__body p:last-child {
  margin-bottom: 0;
}

.v-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}

/* Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .v-modal,
.modal-leave-active .v-modal {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .v-modal,
.modal-leave-to .v-modal {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}
</style>
