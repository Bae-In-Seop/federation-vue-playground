<script setup lang="ts">
import { ref } from 'vue'

interface TabItem {
  id: string
  label: string
  content: string
}

const props = defineProps<{
  items: TabItem[]
}>()

const activeTab = ref(props.items[0]?.id || '')
</script>

<template>
  <div class="v-tabs">
    <div class="v-tabs__header">
      <button
        v-for="item in items"
        :key="item.id"
        class="v-tabs__tab"
        :class="{ 'v-tabs__tab--active': activeTab === item.id }"
        @click="activeTab = item.id"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="v-tabs__content">
      <div
        v-for="item in items"
        :key="item.id"
        v-show="activeTab === item.id"
        class="v-tabs__panel"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-tabs {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.v-tabs__header {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.v-tabs__tab {
  flex: 1;
  padding: 14px 20px;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
  font-family: inherit;
  font-weight: 500;
  color: #64748b;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
}

.v-tabs__tab:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.v-tabs__tab--active {
  color: var(--theme-primary, #6366f1);
  background: white;
}

.v-tabs__tab--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--theme-primary, #6366f1);
}

.v-tabs__content {
  padding: 20px;
  background: white;
}

.v-tabs__panel {
  font-size: calc(var(--base-font-size, 16px) * 0.95);
  color: #475569;
  line-height: 1.6;
}
</style>
