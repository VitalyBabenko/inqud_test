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

export declare type StructuredText<R1 extends Record = Record, R2 extends Record = R1> = {
  value: Document;
  blocks?: R1[];
  links?: R2[];
};

interface PostContent {
  value: {
    schema: 'dast';
    document: RootNode;
  };
}

export { SpanNode, HeadingNode, ParagraphNode, RootNode, PostContent };
