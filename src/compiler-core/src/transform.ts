import { NodeTypes } from "./ast";
import { TO_DISPLAY_STRING, helperMapName } from "./runtimeHelpers";

export function transform(root, options = {}) {
  const context = createTransformContext(root, options);
  traverseNode(root, context);
  createRootCodegen(root);
  root.helpers = [...context.helpers.keys()];
}
function traverseNode(node: any, context) {
  // console.log(node);
  const nodeTransforms = context.nodeTransforms;

  for (const transform of nodeTransforms) {
    transform(node);
  }
  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING);
      break;
    case NodeTypes.ROOT:
    case NodeTypes.ELEMENT:
      traverseChildren(node, context);
      break;
    default:
      break;
  }
}

function traverseChildren(node: any, context: any) {
  const children = node.children;
  for (const node of children) {
    traverseNode(node, context);
  }
}

function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper: function (key) {
      context.helpers.set(key, 1);
    },
  };

  return context;
}
function createRootCodegen(root: any) {
  root.codegenNode = root.children[0];
}