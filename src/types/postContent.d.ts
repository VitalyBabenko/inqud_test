interface SpanNode {
  type: 'span';
  value: string;
}

interface HeadingNode {
  type: 'heading';
  level: number;
  children: SpanNode[];
}

interface ParagraphNode {
  type: 'paragraph';
  children: SpanNode[];
}

interface RootNode {
  type: 'root';
  children: (HeadingNode | ParagraphNode)[];
}

interface PostContent {
  value: {
    schema: 'dast';
    document: RootNode;
  };
}

export { SpanNode, HeadingNode, ParagraphNode, RootNode, PostContent };
