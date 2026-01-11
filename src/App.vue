<script setup lang="ts">
import { ref } from 'vue'
import VButton from './components/VButton.vue'
import VIconButton from './components/VIconButton.vue'
import VBadge from './components/VBadge.vue'
import VCard from './components/VCard.vue'
import VInput from './components/VInput.vue'
import VToggle from './components/VToggle.vue'
import VRadioGroup from './components/VRadioGroup.vue'
import VCheckboxGroup from './components/VCheckboxGroup.vue'
import VToast from './components/VToast.vue'
import VModal from './components/VModal.vue'
import VTable from './components/VTable.vue'
import VTabs from './components/VTabs.vue'
import VAccordion from './components/VAccordion.vue'
import VChart from './components/VChart.vue'

const inputValue = ref('')
const toggleChecked = ref(false)
const selectedRadio = ref('option1')
const selectedCheckboxes = ref(['option1'])
const isModalOpen = ref(false)
const toastRef = ref<InstanceType<typeof VToast> | null>(null)

const radioOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
]

const checkboxOptions = [
  { value: 'option1', label: '사과' },
  { value: 'option2', label: '바나나' },
  { value: 'option3', label: '오렌지' },
  { value: 'option4', label: '포도' },
]

const tableColumns = [
  { key: 'id', header: 'ID', align: 'center' as const },
  { key: 'name', header: '이름' },
  { key: 'role', header: '역할' },
  { key: 'status', header: '상태', align: 'center' as const },
]

const tableData = [
  { id: 1, name: '홍길동', role: '개발자', status: '활성' },
  { id: 2, name: '김영희', role: '디자이너', status: '활성' },
  { id: 3, name: '이철수', role: '매니저', status: '비활성' },
  { id: 4, name: '박민수', role: '개발자', status: '활성' },
]

const tabItems = [
  { id: 'tab1', label: '탭 1', content: '첫 번째 탭의 내용입니다. Vue.js로 만든 탭 컴포넌트입니다.' },
  { id: 'tab2', label: '탭 2', content: '두 번째 탭의 내용입니다. 탭을 클릭하여 내용을 전환할 수 있습니다.' },
  { id: 'tab3', label: '탭 3', content: '세 번째 탭의 내용입니다. CSS 변수를 통해 테마가 적용됩니다.' },
]

const accordionItems = [
  { id: 'acc1', title: 'Vue.js란?', content: 'Vue.js는 사용자 인터페이스를 만들기 위한 프로그레시브 프레임워크입니다. 다른 단일형 프레임워크와 달리 Vue는 점진적으로 채택할 수 있도록 설계되었습니다.' },
  { id: 'acc2', title: 'Composition API', content: 'Vue 3에서 도입된 Composition API는 컴포넌트 로직을 더 유연하게 구성할 수 있게 해줍니다. setup() 함수나 <script setup>을 사용하여 반응형 상태와 함수를 정의합니다.' },
  { id: 'acc3', title: 'Module Federation', content: '이 프로젝트는 Module Federation을 사용하여 Host 앱에서 Vue 컴포넌트를 동적으로 로드합니다. React Host에서 Vue Remote를 불러오는 마이크로 프론트엔드 아키텍처입니다.' },
]

const showToast = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
  toastRef.value?.show(type, message)
}
</script>

<template>
  <div class="playground">
    <!-- Button -->
    <section class="showcase">
      <h2 class="showcase__title">Button</h2>
      <div class="showcase__content">
        <div class="showcase__row">
          <VIconButton variant="primary" icon-only>
            <template #icon>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </template>
          </VIconButton>
          <VIconButton variant="secondary" icon-only>
            <template #icon>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </template>
          </VIconButton>
          <VIconButton variant="outline" icon-only>
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </template>
          </VIconButton>
          <VIconButton variant="ghost" icon-only>
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </template>
          </VIconButton>
        </div>
        <div class="showcase__row">
          <VButton variant="primary">Primary</VButton>
          <VButton variant="secondary">Secondary</VButton>
          <VButton variant="outline">Outline</VButton>
          <VButton variant="ghost">Ghost</VButton>
        </div>
        <div class="showcase__row">
          <VButton size="sm">Small</VButton>
          <VButton size="md">Medium</VButton>
          <VButton size="lg">Large</VButton>
        </div>
        <div class="showcase__row">
          <VButton disabled>Disabled</VButton>
          <VIconButton variant="primary" icon-only disabled>
            <template #icon>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </template>
          </VIconButton>
        </div>
      </div>
    </section>

    <!-- Badge -->
    <section class="showcase">
      <h2 class="showcase__title">Badge</h2>
      <div class="showcase__content">
        <div class="showcase__row">
          <VBadge>Default</VBadge>
          <VBadge variant="success">Success</VBadge>
          <VBadge variant="warning">Warning</VBadge>
          <VBadge variant="error">Error</VBadge>
          <VBadge variant="info">Info</VBadge>
        </div>
      </div>
    </section>

    <!-- Card -->
    <section class="showcase">
      <h2 class="showcase__title">Card</h2>
      <div class="showcase__content">
        <div class="showcase__grid">
          <VCard title="Card Title" description="This is a card description">
            <p>Card content goes here.</p>
          </VCard>
          <VCard title="Another Card">
            <p>Cards are flexible containers.</p>
            <VButton variant="outline" size="sm">Action</VButton>
          </VCard>
        </div>
      </div>
    </section>

    <!-- Input -->
    <section class="showcase">
      <h2 class="showcase__title">Input</h2>
      <div class="showcase__content">
        <div class="showcase__stack">
          <VInput
            v-model="inputValue"
            label="Username"
            placeholder="Enter your username"
          />
          <VInput
            label="Email"
            type="email"
            placeholder="you@example.com"
          />
          <VInput
            label="Password"
            type="password"
            error="Password must be at least 8 characters"
          />
        </div>
      </div>
    </section>

    <!-- Toggle -->
    <section class="showcase">
      <h2 class="showcase__title">Toggle</h2>
      <div class="showcase__content">
        <div class="showcase__row">
          <VToggle v-model="toggleChecked" label="Enable notifications" />
          <VToggle label="Dark mode" />
          <VToggle label="Disabled toggle" disabled />
        </div>
      </div>
    </section>

    <!-- Select (Radio & Checkbox) -->
    <section class="showcase">
      <h2 class="showcase__title">Select</h2>
      <div class="showcase__content">
        <div class="showcase__stack-wide">
          <div class="select-group">
            <h4 class="select-group__title">Radio</h4>
            <VRadioGroup
              v-model="selectedRadio"
              name="demo-radio"
              :options="radioOptions"
              direction="horizontal"
            />
          </div>
          <div class="select-group">
            <h4 class="select-group__title">Checkbox</h4>
            <VCheckboxGroup
              v-model="selectedCheckboxes"
              :options="checkboxOptions"
              direction="horizontal"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs -->
    <section class="showcase">
      <h2 class="showcase__title">Tabs</h2>
      <div class="showcase__content">
        <VTabs :items="tabItems" />
      </div>
    </section>

    <!-- Accordion -->
    <section class="showcase">
      <h2 class="showcase__title">Accordion</h2>
      <div class="showcase__content">
        <VAccordion :items="accordionItems" />
      </div>
    </section>

    <!-- Toast -->
    <section class="showcase">
      <h2 class="showcase__title">Toast Notification</h2>
      <div class="showcase__content">
        <div class="showcase__row">
          <button class="toast-btn toast-btn--info" @click="showToast('info', '정보 메시지입니다.')">Info</button>
          <button class="toast-btn toast-btn--success" @click="showToast('success', '성공적으로 완료되었습니다!')">Success</button>
          <button class="toast-btn toast-btn--warning" @click="showToast('warning', '주의가 필요합니다.')">Warning</button>
          <button class="toast-btn toast-btn--error" @click="showToast('error', '오류가 발생했습니다.')">Error</button>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <section class="showcase">
      <h2 class="showcase__title">Modal</h2>
      <div class="showcase__content">
        <VButton variant="primary" @click="isModalOpen = true">모달 열기</VButton>
      </div>
    </section>

    <!-- Table -->
    <section class="showcase">
      <h2 class="showcase__title">Table</h2>
      <div class="showcase__content">
        <VTable :columns="tableColumns" :data="tableData" />
      </div>
    </section>

    <!-- Charts -->
    <section class="showcase">
      <h2 class="showcase__title">Charts</h2>
      <div class="showcase__content">
        <div class="chart-grid">
          <VChart type="line" title="Line Chart" />
          <VChart type="bar" title="Bar Chart" />
          <VChart type="pie" title="Pie Chart" />
          <VChart type="area" title="Area Chart" />
        </div>
      </div>
    </section>

    <!-- Toast Container -->
    <VToast ref="toastRef" />

    <!-- Modal -->
    <VModal v-model="isModalOpen" title="모달 제목">
      <p>이것은 Vue로 만든 모달 팝업입니다.</p>
      <p>ESC 키를 누르거나 외부를 클릭하여 닫을 수 있습니다.</p>
      <template #footer>
        <VButton variant="ghost" @click="isModalOpen = false">취소</VButton>
        <VButton variant="primary" @click="isModalOpen = false">확인</VButton>
      </template>
    </VModal>
  </div>
</template>

<style>
@import './style.css';
</style>
