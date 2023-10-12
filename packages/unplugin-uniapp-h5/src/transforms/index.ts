import { isH5CustomElement, isH5NativeTag } from '../libs/uniapp/uni-shared/src/tags';
import { createTransformEvent } from './transformEvent'
export * from './transformEvent'

export const transformTapToClick = createTransformEvent({
  tap: (node) => {
    // 地图组件有自己特定的 tap 事件
    if (node.tag === 'map' || node.tag === 'v-uni-map') {
      return 'tap'
    }
    return 'click'
  },
});

export function createVueOptions() {
  return {
    isNativeTag: isH5NativeTag,
    isCustomElement: isH5CustomElement,
    nodeTransforms: [
      transformTapToClick,
    ],
  }
}