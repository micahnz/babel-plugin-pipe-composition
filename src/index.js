export default () => {
  ({
    visitor: {
      BinaryExpression(path) {
        if (!path.isBinaryExpression({ operator: "|" })) return

        const rightPath = path.get("right")

        rightPath.assertCallExpression()

        rightPath.node.arguments.unshift(path.node.left)
        path.replaceWith(rightPath)

        return
      }
    }
  })
}
