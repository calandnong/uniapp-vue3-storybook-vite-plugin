import { VNode, Component, createTextVNode, createVNode, Comment } from 'vue'
import { defineBuiltInComponent } from '../../helpers/component'
import { DecodeOptions, parseText } from '../../helpers/text'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Text',
  props: {
    selectable: {
      type: [Boolean, String],
      default: false,
    },
    space: {
      type: String,
      default: '',
    },
    decode: {
      type: [Boolean, String],
      default: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      const children: VNode[] = []
      if (slots.default) {
        slots.default().forEach((vnode) => {
          if (
            vnode.shapeFlag & 8 /* TEXT_CHILDREN */ &&
            vnode.type !== Comment
          ) {
            const lines = parseText(vnode.children as string, {
              space: props.space as DecodeOptions['space'],
              decode: props.decode as boolean,
            })
            const len = lines.length - 1
            lines.forEach((line, index) => {
              if (index === 0 && !line) {
                // 临时方案解决(<text>\n横向布局</text>) Hydration node mismatch
              } else {
                children.push(createTextVNode(line))
              }
              if (index !== len) {
                children.push(createVNode('br'))
              }
            })
          } else {
            if (
              __DEV__ &&
              vnode.shapeFlag & 6 /* COMPONENT */ &&
              (vnode.type as Component).name !== 'Text'
            ) {
              console.warn(
                'Do not nest other components in the text component, as there may be display differences on different platforms.'
              )
            }
            children.push(vnode)
          }
        })
      }
      return (
        <uni-text selectable={props.selectable ? true : null}>
          {createVNode('span', null, children)}
        </uni-text>
      )
    }
  },
})
