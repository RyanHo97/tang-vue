<template>
  <div ref="nestedFromRef" class="nested-container">
    <div
      v-for="(component, index) in components"
      :key="component.element"
      class="components-container"
      :class="{ 'active-item': activeItem === component }"
      @click="handleActiveItem(component, $event)"
    >
      <RenderForm v-model="components[index]" />
      <!-- <NestedForm
        v-if="component.element === 'el-row' && component.children?.length > 0"
        v-model="components[index].children"
        v-model:activeItem="activeItem"
      /> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDraggable } from 'vue-draggable-plus'
import { getProxy } from '@/utils/getCurrentInstance'
import type { Component } from '../types'
import RenderForm from './RenderForm.vue'

const proxy = getProxy()

const props = defineProps({
  modelValue: {
    type: Array<Component>,
    default: []
  },
  activeItem: {
    type: Object as PropType<Component>,
    default: null
  }
})

const components = computed({
  get: () => props.modelValue,
  set: val => proxy.$emit('update:modelValue', val)
})

const activeItem = computed<Component>({
  get: () => props.activeItem,
  set: val => proxy.$emit('update:activeItem', val)
})

const handleActiveItem = (component: Component, event: MouseEvent | null = null) => {
  if (!event) return
  event.preventDefault()
  event.stopPropagation()
  activeItem.value = component
}

const nestedFromRef = ref<HTMLDivElement>()

useDraggable(nestedFromRef, components, {
  animation: 350,
  ghostClass: 'dragging',
  group: 'components'
})
</script>

<style lang="scss" scoped>
.active-item {
  outline: 2px solid var(--el-color-primary);
  margin: 2px;
}

.nested-container {
  border: 1px dashed #336699;

  .components-container {
    margin: 4px 0;

    .el-form-item {
      padding: 4px 0;
      margin: 8px 0;
    }

    &:first-child > .component > .el-form-item {
      margin-top: 0;
    }

    &:last-child > .component > .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
