<script setup lang="ts">
import { ref } from 'vue'

interface AccordionItem {
  id: string
  title: string
  content: string
}

defineProps<{
  items: AccordionItem[]
}>()

const openItems = ref<Set<string>>(new Set())

const toggle = (id: string) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id)
  } else {
    openItems.value.add(id)
  }
  openItems.value = new Set(openItems.value)
}
</script>

<template>
  <div class="v-accordion">
    <div
      v-for="item in items"
      :key="item.id"
      class="v-accordion__item"
      :class="{ 'v-accordion__item--open': openItems.has(item.id) }"
    >
      <button class="v-accordion__header" @click="toggle(item.id)">
        <span class="v-accordion__title">{{ item.title }}</span>
        <span class="v-accordion__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div class="v-accordion__content">
        <div class="v-accordion__body">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-accordion {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.v-accordion__item {
  border-bottom: 1px solid #e2e8f0;
}

.v-accordion__item:last-child {
  border-bottom: none;
}

.v-accordion__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  font-size: calc(var(--base-font-size, 16px) * 0.95);
  font-family: inherit;
  font-weight: 500;
  color: #1e293b;
  background: white;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.v-accordion__header:hover {
  background: #f8fafc;
}

.v-accordion__title {
  text-align: left;
}

.v-accordion__icon {
  width: 20px;
  height: 20px;
  color: #64748b;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.v-accordion__icon svg {
  width: 100%;
  height: 100%;
}

.v-accordion__item--open .v-accordion__icon {
  transform: rotate(180deg);
}

.v-accordion__item--open .v-accordion__header {
  color: var(--theme-primary, #6366f1);
}

.v-accordion__content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.v-accordion__item--open .v-accordion__content {
  grid-template-rows: 1fr;
}

.v-accordion__body {
  overflow: hidden;
  padding: 0 20px;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  color: #64748b;
  line-height: 1.6;
}

.v-accordion__item--open .v-accordion__body {
  padding: 0 20px 16px;
}
</style>
