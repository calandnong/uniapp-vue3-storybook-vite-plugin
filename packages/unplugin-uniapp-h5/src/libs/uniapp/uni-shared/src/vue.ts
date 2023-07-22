import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  RendererNode,
  VNode,
} from '@vue/runtime-core'
import { camelize, hyphenate } from '@vue/shared'

import { isBuiltInComponent } from './tags'
import { SLOT_DEFAULT_NAME } from './constants'

export function isComponentInternalInstance(
  vm: unknown
): vm is ComponentInternalInstance {
  return !!(vm as ComponentInternalInstance).appContext
}

export function resolveComponentInstance(
  instance?: ComponentInternalInstance | ComponentPublicInstance
) {
  return (
    instance &&
    (isComponentInternalInstance(instance) ? instance.proxy! : instance)
  )
}

export function resolveOwnerVm(vm: ComponentInternalInstance) {
  if (!vm) {
    return
  }
  let componentName = vm.type.name
  while (componentName && isBuiltInComponent(hyphenate(componentName))) {
    // ownerInstance 内置组件需要使用父 vm
    vm = vm.parent!
    componentName = vm.type.name
  }
  return vm.proxy!
}

function isElement(el: Element) {
  // Element
  return el.nodeType === 1
}
export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi: true
): RendererNode[]
export function resolveOwnerEl(
  instance: ComponentInternalInstance
): RendererNode | null
export function resolveOwnerEl(
  instance: ComponentInternalInstance,
  multi: boolean = false
): RendererNode | null {
  const { vnode } = instance
  if (isElement(vnode.el as Element)) {
    return multi ? (vnode.el ? [vnode.el] : []) : vnode.el
  }
  const { subTree } = instance
  // ShapeFlags.ARRAY_CHILDREN = 1<<4
  if (subTree.shapeFlag & 16) {
    const elemVNodes = (subTree.children as VNode[]).filter(
      (vnode) => vnode.el && isElement(vnode.el as Element)
    )
    if (elemVNodes.length > 0) {
      if (multi) {
        return elemVNodes.map((node) => node.el)
      }
      return elemVNodes[0].el
    }
  }
  return multi ? (vnode.el ? [vnode.el] : []) : vnode.el
}

export function dynamicSlotName(name: string) {
  return name === 'default' ? SLOT_DEFAULT_NAME : name
}

const customizeRE = /:/g

export function customizeEvent(str: string) {
  return camelize(str.replace(customizeRE, '-'))
}
