<script setup lang="ts" generic="T extends Record<string, unknown>">
interface Column {
  key: string
  header: string
  align?: 'left' | 'center' | 'right'
}

defineProps<{
  columns: Column[]
  data: T[]
}>()

const getCellValue = (item: T, key: string) => {
  return item[key]
}

const getStatusClass = (value: unknown) => {
  if (value === '활성') return 'v-table-status--active'
  if (value === '비활성') return 'v-table-status--inactive'
  return ''
}
</script>

<template>
  <div class="v-table-wrapper">
    <table class="v-table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align || 'left' }"
          >
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ textAlign: column.align || 'left' }"
          >
            <span
              v-if="column.key === 'status'"
              class="v-table-status"
              :class="getStatusClass(getCellValue(item, column.key))"
            >
              {{ getCellValue(item, column.key) }}
            </span>
            <template v-else>
              {{ getCellValue(item, column.key) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.v-table-wrapper {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
}

.v-table {
  width: 100%;
  border-collapse: collapse;
  font-size: calc(var(--base-font-size, 16px) * 0.9);
}

.v-table th,
.v-table td {
  padding: 14px 16px;
  text-align: left;
}

.v-table thead {
  background: #f8fafc;
}

.v-table th {
  font-weight: 600;
  color: #475569;
  border-bottom: 1px solid #e2e8f0;
  white-space: nowrap;
}

.v-table tbody tr {
  transition: background 0.15s ease;
}

.v-table tbody tr:hover {
  background: color-mix(in srgb, var(--theme-primary, #6366f1) 5%, white);
}

.v-table tbody td {
  color: #374151;
  border-bottom: 1px solid #f1f5f9;
}

.v-table tbody tr:last-child td {
  border-bottom: none;
}

.v-table-status {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: calc(var(--base-font-size, 16px) * 0.75);
  font-weight: 500;
  border-radius: 9999px;
}

.v-table-status--active {
  background: #dcfce7;
  color: #166534;
}

.v-table-status--inactive {
  background: #f1f5f9;
  color: #64748b;
}
</style>
