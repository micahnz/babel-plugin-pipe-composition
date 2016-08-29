export default (ref) => {
  var t = ref.types;

  const hasDirective = (path, directive) => {
    let matched = false;

    path.findParent(({ node }) => {
      if (node.directives) {
        node.directives.some(({ value }) => {
          matched = (value.value == directive);
        });
      }
    });

    return matched;
  };

  return {
    visitor: {
      BinaryExpression(path) {
        if (hasDirective(path, "no pipe")) return;

        if (path.isBinaryExpression({ operator: ">>" })) {
          let args = t.isSequenceExpression(path.node.left)
            ? path.node.left.expressions
            : [path.node.left];

          path.replaceWith(t.callExpression(path.node.right, args));
        }

        if (path.isBinaryExpression({ operator: "<<" })) {
          if (t.isCallExpression(path.parent)) {
            let expr = t.callExpression(
              path.parent.callee.right,
              path.parent.arguments
            );

            path.parentPath.replaceWith(t.callExpression(path.node.left, [expr]));
          }
          else {
            let args = t.isSequenceExpression(path.node.right)
              ? path.node.right.expressions
              : [path.node.right];

            path.replaceWith(t.callExpression(path.node.left, args));
          }
        }
      }
    }
  };
};
