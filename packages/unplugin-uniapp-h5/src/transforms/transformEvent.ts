import { DirectiveNode, ElementNode, NodeTransform } from '@vue/compiler-core'
import { isElementNode, isSimpleExpressionNode } from './ast'

export function createTransformEvent(
  options: Record<
    string,
    string | ((node: ElementNode, dir: DirectiveNode) => string)
  >
): NodeTransform {
  return function transformEvent(node) {
    if (!isElementNode(node)) {
      return
    }
    node.props.forEach((prop) => {
      const { name, arg } = prop as DirectiveNode
      if (name === 'on' && arg && isSimpleExpressionNode(arg)) {
        const eventType = options[arg.content]
        if (eventType) {
          // e.g tap => click
          if (typeof eventType === 'function') {
            arg.content = eventType(node, prop as DirectiveNode)
          } else {
            arg.content = eventType
          }
        }
      }
    })
  }
}
