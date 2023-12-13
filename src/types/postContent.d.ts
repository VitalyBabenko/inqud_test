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
  /** A DatoCMS compatible document */
  value: Document;
  /** Blocks associated with the Structured Text */
  blocks?: R1[];
  /** Links associated with the Structured Text */
  links?: R2[];
};

interface PostContent {
  value: {
    schema: 'dast';
    document: RootNode;
  };
}

export { SpanNode, HeadingNode, ParagraphNode, RootNode, PostContent };
