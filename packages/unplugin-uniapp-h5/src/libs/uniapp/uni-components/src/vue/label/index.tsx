import { computed } from 'vue'
import { useCurrentPageId } from '@dcloudio/uni-core'
import { withWebEvent } from '../../helpers/useEvent'
import { defineBuiltInComponent } from '../../helpers/component'
import { labelProps, useProvideLabel } from '../../components/label'

export { type UniLabelCtx, uniLabelKey } from '../../components/label'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Label',
  props: labelProps,
  setup(props, { slots }) {
    const pageId = useCurrentPageId()
    const handlers = useProvideLabel()

    const pointer = computed(
      () => props.for || (slots.default && slots.default.length)
    )

    const _onClick = withWebEvent(($event: Event) => {
      const EventTarget = $event.target as HTMLElement
      let stopPropagation = /^uni-(checkbox|radio|switch)-/.test(
        EventTarget.className
      )
      if (!stopPropagation) {
        // 现在checkbox图标已经改为svg实现，svg和path都跳过
        stopPropagation =
          /^uni-(checkbox|radio|switch|button)$|^(svg|path)$/i.test(
            EventTarget.tagName
          )
      }
      if (stopPropagation) {
        return
      }

      if (props.for) {
        UniViewJSBridge.emit(
          'uni-label-click-' + pageId + '-' + props.for,
          $event,
          true
        )
      } else {
        handlers.length && handlers[0]($event, true)
      }
    })

    return () => (
      <uni-label class={{ 'uni-label-pointer': pointer }} onClick={_onClick}>
        {slots.default && slots.default()}
      </uni-label>
    )
  },
})
