export default () => {
  const hasDirective = (path, directive) => {
    !!path.findParent(({ node }) => {
      node.directives && node.directives.some(({ value }) => {
        value.value == directive
      })
    })
  }

  return {
    visitor: {
      BinaryExpression(path) {
        if (!path.isBinaryExpression({ operator: "|" })) return
        if (hasDirective(path, "no pipe")) return

        const rightPath = path.get("right")

        rightPath.assertCallExpression()

        rightPath.node.arguments.unshift(path.node.left)
        path.replaceWith(rightPath)

        return
      }
    }
  }
}
