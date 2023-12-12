import { NodeTypes } from "./ast";

const enum TagType {
  START,
  END,
}

export function baseParse(content) {
  const context = createParserContext(content);

  return createRoot(parseChildren(context));
}

function parseChildren(context) {
  const nodes: any = [];
  let node;
  const s = context.source;
  if (s.startsWith("{{")) {
    node = parseInterpolation(context);
  } else if (s[0] === "<") {
    if (/[a-z]/i.test(s[1])) {
      node = parseElement(context);
    }
  }

  if (!node) {
    node = parseText(context);
  }
  nodes.push(node);

  return nodes;
}

function parseText(context) {
  const content = parseTextData(context, context.source.length);
  return {
    type: NodeTypes.TEXT,
    content: content,
  };
}

function parseTextData(context: any, length) {
  const content = context.source.slice(0, length);
  advanceBy(context, content.length);
  return content;
}

function parseElement(context) {
  //1. 解析tag
  //2. 解析tag

  const elemnt = parseTag(context, TagType.START);

  parseTag(context, TagType.END);

  return elemnt;
}
function parseTag(context: any, type) {
  const match: any = /^<\/?([a-z]+)/i.exec(context.source);
  const tag = match[1];
  advanceBy(context, match[0].length);
  advanceBy(context, 1);
  if (type === TagType.END) {
    return;
  }
  return {
    type: NodeTypes.ELEMENT,
    tag: tag,
  };
}

function parseInterpolation(context) {
  const openDelimiter = "{{";
  const closeDelimiter = "}}";
  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length,
  );
  advanceBy(context, openDelimiter.length);
  const rawContentLength = closeIndex - closeDelimiter.length;
  const rawContent = parseTextData(context, rawContentLength)
  advanceBy(context, closeDelimiter.length);

  const content = rawContent.trim();
  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  };
}
function advanceBy(context: any, length) {
  context.source = context.source.slice(length);
}

function createRoot(children) {
  return {
    children,
  };
}

function createParserContext(content) {
  return {
    source: content,
  };
}
