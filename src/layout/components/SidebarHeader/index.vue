<template>
  <el-header v-if="sidebarHeader" class="logo">
    <transition>
      <router-link
        class="logo-link"
        to="/index"
        v-if="title"
      >
        <el-image :src="logo" class="logo-image" />
      </router-link>
      <router-link
        class="logo-link"
        to="/index"
        v-else
      >
        <el-image
          v-if="sidebarHeaderLogo"
          :src="logo"
          class="logo-image"
        />
        <span v-show="!title" class="logo-title">{{ settings.title }}</span>
      </router-link>
    </transition>
  </el-header>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/modules/app'
import logo from '@/assets/logo.png'
import settings from '@/settings'

const appStore = useAppStore()

const sidebarHeader = computed(() => appStore.sidebarHeader)
const sidebarHeaderLogo = computed(() => appStore.sidebarHeaderLogo)
const title = computed(() => appStore.sidebar)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.logo {
  height: $headerHeight;
  padding: 0 1rem;

  .logo-link {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: 600;
  }

  .logo-image {
    width: 30px;
    height: 30px;
    border: 1px solid rgb(194, 194, 194);
  }

  .logo-title {
    margin-left: .75rem;
    color: var(--el-menu-text-color);
  }
}

.v-enter-active {
  transition: opacity 1200ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
