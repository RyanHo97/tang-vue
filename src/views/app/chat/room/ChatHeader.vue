<template>
  <!-- 头部 -->
  <div class="selected-person">
    <div class="nickname">{{ selectedItem ? selectedItem.nickname : "" }}</div>
    <div class="status-icon">
      <!-- 在线状态图标 -->
      在线
    </div>
  </div>
  <div class="settings-icon">
    <!-- 设置图标 -->
    <el-button
      :icon="Setting"
      circle
      @click="toggleDrawer"
    />
  </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { getProxy } from '@/utils/getCurrentInstance'
import { AppChatList } from '@/api/app/chat/chat-list/types'

const proxy = getProxy()

const props = defineProps<{
  selectedItem: AppChatList | null
}>()

const state = reactive({
  showDrawer: false,
})

const {
  showDrawer
} = toRefs(state)

const toggleDrawer = (): void => {
  proxy.$notImplemented()
  state.showDrawer = !state.showDrawer
  proxy.$emit('showSetting', state.showDrawer)
}

const closeDrawer = (): void => {
  state.showDrawer = false
}
</script>

<style lang="scss" scoped>
.selected-person {
  display: flex;
  align-items: center;

  .nickname {
    margin-right: 10px;
  }

  .status-icon {
  }
}

.settings-icon {
  cursor: pointer;
}
</style>
