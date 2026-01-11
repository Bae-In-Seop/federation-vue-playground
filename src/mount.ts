import { createApp, type App as VueApp } from 'vue'
import AppComponent from './App.vue'

interface MountOptions {
  container: HTMLElement
}

let app: VueApp | null = null

export function mount({ container }: MountOptions) {
  app = createApp(AppComponent)
  app.mount(container)
  return app
}

export function unmount() {
  if (app) {
    app.unmount()
    app = null
  }
}
