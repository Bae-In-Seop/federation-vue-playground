<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import Highcharts from 'highcharts'

const props = defineProps<{
  type: 'line' | 'bar' | 'pie' | 'area'
  title?: string
  data?: number[]
  categories?: string[]
}>()

const chartContainer = ref<HTMLDivElement | null>(null)
const themeColor = ref('#6366f1')
const accentColor = ref('#22c55e')
let chart: Highcharts.Chart | null = null
let colorCheckInterval: number | null = null

const defaultData = computed(() => props.data || [65, 59, 80, 81, 56, 55, 72])
const defaultCategories = computed(() => props.categories || ['1월', '2월', '3월', '4월', '5월', '6월', '7월'])

function getThemeColors() {
  if (!chartContainer.value) return
  const style = getComputedStyle(chartContainer.value)
  const primary = style.getPropertyValue('--theme-primary').trim()
  const accent = style.getPropertyValue('--theme-accent').trim()

  if (primary && primary !== themeColor.value) {
    themeColor.value = primary
  }
  if (accent && accent !== accentColor.value) {
    accentColor.value = accent
  }
}

function getChartOptions(): Highcharts.Options {
  const baseOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit',
      },
    },
    title: {
      text: props.title || '',
      style: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1e293b',
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: '#475569',
        fontWeight: '500',
      },
    },
  }

  switch (props.type) {
    case 'line':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'line',
        },
        xAxis: {
          categories: defaultCategories.value,
          labels: {
            style: { color: '#64748b' },
          },
          lineColor: '#e2e8f0',
        },
        yAxis: {
          title: { text: '' },
          labels: {
            style: { color: '#64748b' },
          },
          gridLineColor: '#f1f5f9',
        },
        series: [
          {
            name: '데이터',
            type: 'line',
            data: defaultData.value,
            color: themeColor.value,
            marker: {
              fillColor: themeColor.value,
              lineColor: '#fff',
              lineWidth: 2,
            },
          },
        ],
      }

    case 'bar':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'column',
        },
        xAxis: {
          categories: defaultCategories.value,
          labels: {
            style: { color: '#64748b' },
          },
          lineColor: '#e2e8f0',
        },
        yAxis: {
          title: { text: '' },
          labels: {
            style: { color: '#64748b' },
          },
          gridLineColor: '#f1f5f9',
        },
        plotOptions: {
          column: {
            borderRadius: 4,
          },
        },
        series: [
          {
            name: '데이터',
            type: 'column',
            data: defaultData.value,
            color: themeColor.value,
          },
        ],
      }

    case 'pie':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'pie',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f}%',
              style: {
                color: '#475569',
              },
            },
          },
        },
        series: [
          {
            name: '비율',
            type: 'pie',
            data: [
              { name: 'A 항목', y: 30, color: themeColor.value },
              { name: 'B 항목', y: 25, color: accentColor.value },
              { name: 'C 항목', y: 20, color: '#f59e0b' },
              { name: 'D 항목', y: 15, color: '#ef4444' },
              { name: 'E 항목', y: 10, color: '#94a3b8' },
            ],
          },
        ],
      }

    case 'area':
      return {
        ...baseOptions,
        chart: {
          ...baseOptions.chart,
          type: 'area',
        },
        xAxis: {
          categories: defaultCategories.value,
          labels: {
            style: { color: '#64748b' },
          },
          lineColor: '#e2e8f0',
        },
        yAxis: {
          title: { text: '' },
          labels: {
            style: { color: '#64748b' },
          },
          gridLineColor: '#f1f5f9',
        },
        plotOptions: {
          area: {
            fillOpacity: 0.3,
          },
        },
        series: [
          {
            name: '데이터',
            type: 'area',
            data: defaultData.value,
            color: themeColor.value,
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
              stops: [
                [0, themeColor.value],
                [1, 'rgba(255,255,255,0)'],
              ],
            },
          },
        ],
      }

    default:
      return baseOptions
  }
}

function renderChart() {
  if (!chartContainer.value) return

  if (chart) {
    chart.destroy()
  }

  chart = Highcharts.chart(chartContainer.value, getChartOptions())
}

watch([themeColor, accentColor], () => {
  nextTick(() => {
    renderChart()
  })
})

onMounted(() => {
  getThemeColors()
  renderChart()

  // Poll for theme color changes
  colorCheckInterval = window.setInterval(() => {
    getThemeColors()
  }, 100)
})

onUnmounted(() => {
  if (colorCheckInterval) {
    clearInterval(colorCheckInterval)
  }
  if (chart) {
    chart.destroy()
    chart = null
  }
})
</script>

<template>
  <div class="v-chart">
    <div ref="chartContainer" class="v-chart__container"></div>
  </div>
</template>

<style scoped>
.v-chart {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
}

.v-chart__container {
  width: 100%;
  height: 280px;
}
</style>
