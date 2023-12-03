import { HeadingNode, ParagraphNode, PostContent } from '@/types/postContent';

function countWords(text: string): number {
  const words: string[] = text.trim().split(/\s+/);
  return words.length;
}

export function calculateReadingPostTime(
  content: PostContent,
  wordsPerMinute: number = 120,
): number {
  let totalWords = 0;

  function processNode(node: HeadingNode | ParagraphNode) {
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        if (child.type === 'span' && child.value) {
          totalWords += countWords(child.value);
        }
      });
    }
  }

  if (content.value && content.value.document && content.value.document.children) {
    content.value.document.children.forEach((node) => {
      if (node.type === 'heading' || node.type === 'paragraph') {
        processNode(node);
      }
    });
  }

  const readingTime = Math.ceil(totalWords / wordsPerMinute);
  return readingTime;
}
