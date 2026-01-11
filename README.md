# Federation Vue Playground

Module Federation Remote 애플리케이션으로, Vue 3 기반의 컴포넌트 데모를 제공합니다.

## Overview

이 프로젝트는 Host 애플리케이션(React)에서 런타임에 동적으로 로드되는 Vue 기반 Remote 앱입니다. Module Federation을 통해 서로 다른 프레임워크(React ↔ Vue) 간의 통합을 구현합니다.

## Tech Stack

- **Framework**: Vue 3.5
- **Build Tool**: Vite 7
- **Module Federation**: @module-federation/vite
- **Charts**: Highcharts + highcharts-vue
- **Language**: TypeScript

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Host Application                        │
│                       (React + Vite)                         │
├─────────────────────────────────────────────────────────────┤
│                    Module Federation                         │
├─────────────────────────────────────────────────────────────┤
│                    Vue Playground (Remote)                   │
│                       (Vue 3 + Vite)                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  Tabs   │ │Accordion│ │  Chart  │ │  Modal  │  ...      │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Components

| Component | Description |
|-----------|-------------|
| `VTabs` | 탭 네비게이션 컴포넌트 |
| `VAccordion` | 아코디언 (접기/펼치기) 컴포넌트 |
| `VChart` | Highcharts 기반 차트 컴포넌트 |
| `VTable` | 데이터 테이블 컴포넌트 |
| `VModal` | 모달 다이얼로그 컴포넌트 |
| `VToast` | 토스트 알림 컴포넌트 |
| `VButton` | 버튼 컴포넌트 |
| `VIconButton` | 아이콘 버튼 컴포넌트 |
| `VInput` | 입력 필드 컴포넌트 |
| `VCheckboxGroup` | 체크박스 그룹 컴포넌트 |
| `VRadioGroup` | 라디오 버튼 그룹 컴포넌트 |
| `VToggle` | 토글 스위치 컴포넌트 |
| `VBadge` | 뱃지 컴포넌트 |
| `VCard` | 카드 레이아웃 컴포넌트 |

## Project Structure

```
federation_vue_playground/
├── src/
│   ├── components/
│   │   ├── VAccordion.vue
│   │   ├── VBadge.vue
│   │   ├── VButton.vue
│   │   ├── VCard.vue
│   │   ├── VChart.vue
│   │   ├── VCheckboxGroup.vue
│   │   ├── VIconButton.vue
│   │   ├── VInput.vue
│   │   ├── VModal.vue
│   │   ├── VRadioGroup.vue
│   │   ├── VTable.vue
│   │   ├── VTabs.vue
│   │   ├── VToast.vue
│   │   └── VToggle.vue
│   ├── App.vue            # 메인 앱 컴포넌트
│   ├── main.ts            # 엔트리 포인트
│   ├── mount.ts           # Module Federation mount 함수
│   └── style.css          # 전역 스타일
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Pages 배포 워크플로우
├── vite.config.ts         # Vite 설정
├── tsconfig.json          # TypeScript 설정
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 의존성 설치
npm install
# or
yarn install
```

### Development

```bash
# 개발 서버 실행 (포트 5003)
npm run dev
# or
yarn dev
```

### Build

```bash
# 프로덕션 빌드
npm run build
# or
yarn build
```

### Preview

```bash
# 빌드된 결과물 미리보기
npm run preview
# or
yarn preview
```

## Module Federation Configuration

```typescript
// vite.config.ts
federation({
  name: 'vue_playground',
  filename: 'remoteEntry.js',
  exposes: {
    './mount': './src/mount.ts',
  },
  shared: {},  // Vue는 별도 번들링 (Host와 충돌 방지)
})
```

### Host에서 사용하기

```typescript
// Host의 remotes.d.ts
declare module "vue_playground/mount" {
  export function mount(el: HTMLElement): void;
  export function unmount(): void;
}

// Host에서 로드
const { mount, unmount } = await import("vue_playground/mount");
mount(containerElement);
```

## Related Repositories

- [Federation Host](https://github.com/Bae-In-Seop/federation-host) - Host Application
- [Federation Playground](https://github.com/Bae-In-Seop/federation-playground) - React Remote App

## Demo

- **Standalone**: https://bae-in-seop.github.io/federation-vue-playground/
- **Integrated (Host)**: https://bae-in-seop.github.io/federation-host/

## License

MIT
