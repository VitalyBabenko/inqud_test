import { PostContent, RootNode } from '@/types/postContent';
import {
  StructuredTextDocument,
  StructuredTextGraphQlResponse,
} from 'datocms-structured-text-to-html-string';

interface SpanNode {
  type: string;
  value: string;
  marks?: string[];
}

interface HeadingNode {
  type: string;
  level: number;
  children: SpanNode[];
}

export const findHeadings = (content: StructuredTextGraphQlResponse): string[] => {
  const result: HeadingNode[] = [];
  const value = content.value.document;

  console.log(content);

  const traverse = (node: any) => {
    if (node.type === 'heading') {
      result.push(node as HeadingNode);
    }

    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  };

  traverse(value);

  const headingsTitles = result
    .map((heading) => heading.children.map((child) => child.value))
    .flat();

  return headingsTitles;
};
