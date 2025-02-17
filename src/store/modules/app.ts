import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { Language } from 'element-plus/es/locale'
import { store } from '@/store'
import settings from '@/settings'

/**
 * 获取 localStorage 中的 boolean 值
 *
 * @param key 键
 * @returns boolean | null
 */
const getValue = (key: string): boolean | null => {
  const value: string | null = localStorage.getItem(key)
  if (value === null) {
    return null
  }
  return value === 'true'
}

export const useAppStore = defineStore('app', () => {
  /** 侧边栏头部是否显示 */
  const sidebarHeader: Ref<boolean> = ref(getValue('sidebarHeader') ?? settings.sidebarHeader)
  /** 侧边栏展开时，是否显示logo */
  const sidebarHeaderLogo: Ref<boolean> = ref(getValue('sidebarHeaderLogo') ?? settings.sidebarHeaderLogo)
  /** 顶部是否固定 */
  const fixedHeader: Ref<boolean> = ref(getValue('fixedHeader') ?? settings.fixedHeader)
  /** 折叠侧边栏 */
  const sidebar: Ref<boolean> = ref(getValue('sidebar') ?? settings.sidebar)
  /** 语言 */
  const language: Ref<string> = ref(localStorage.getItem('language') ?? settings.language)
  const elementPlusLocale: Ref<Language> = ref({} as Language)
  /** 组件大小 */
  const size: Ref<string> = ref(localStorage.getItem('size') ?? settings.size)

  watch([sidebarHeader, sidebarHeaderLogo, fixedHeader, sidebar, language, size], (): void => {
    localStorage.setItem('sidebarHeader', String(sidebarHeader.value))
    localStorage.setItem('sidebarHeaderLogo', String(sidebarHeaderLogo.value))
    localStorage.setItem('fixedHeader', String(fixedHeader.value))
    localStorage.setItem('sidebar', String(sidebar.value))
    localStorage.setItem('language', language.value)
    localStorage.setItem('size', size.value)
  }, { deep: true })

  watch(language, async (val: string) => setElementPlusLocale(val))

  const setElementPlusLocale = async (val: string) => {
    const langModule = import(`../../../node_modules/element-plus/dist/locale/${val}.mjs`)
    const { default: Language } = await langModule
    elementPlusLocale.value = Language
  }

  import(`../../../node_modules/element-plus/dist/locale/${language.value}.mjs`)
    .then(({ default: Language }) => elementPlusLocale.value = Language)

  return {
    sidebarHeader,
    sidebarHeaderLogo,
    fixedHeader,
    sidebar,
    language,
    elementPlusLocale,
    size
  }
})

/**
 * 在非 setup 中使用
 *
 * @returns app store
 */
export const useAppStoreHook = () => {
  return useAppStore(store)
}
