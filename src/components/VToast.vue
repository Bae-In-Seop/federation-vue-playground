<script setup lang="ts">
import { ref } from 'vue'

type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastItem {
  id: number
  type: ToastType
  message: string
}

const toasts = ref<ToastItem[]>([])
let toastId = 0

const icons: Record<ToastType, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
}

const show = (type: ToastType, message: string) => {
  const id = ++toastId
  toasts.value.push({ id, type, message })
  setTimeout(() => remove(id), 3000)
}

const remove = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <div class="v-toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="v-toast"
          :class="`v-toast--${toast.type}`"
        >
          <span class="v-toast__icon">{{ icons[toast.type] }}</span>
          <span class="v-toast__message">{{ toast.message }}</span>
          <button class="v-toast__close" @click="remove(toast.id)">×</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.v-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;
}

.v-toast {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 400px;
  pointer-events: auto;
  border-left: 4px solid;
}

.v-toast--info {
  border-left-color: var(--theme-primary, #6366f1);
}

.v-toast--success {
  border-left-color: #22c55e;
}

.v-toast--warning {
  border-left-color: #f59e0b;
}

.v-toast--error {
  border-left-color: #ef4444;
}

.v-toast__icon {
  font-size: calc(var(--base-font-size, 16px) * 1.25);
  flex-shrink: 0;
}

.v-toast__message {
  flex: 1;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  color: #374151;
}

.v-toast__close {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #94a3b8;
  font-size: calc(var(--base-font-size, 16px) * 1.25);
  transition: all 0.15s ease;
}

.v-toast__close:hover {
  background: #f1f5f9;
  color: #64748b;
}

/* Transition */
.toast-enter-active {
  animation: toastSlideIn 0.3s ease;
}

.toast-leave-active {
  animation: toastSlideOut 0.3s ease;
}

@keyframes toastSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toastSlideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
