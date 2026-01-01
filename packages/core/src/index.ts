export interface MarkdownProcessor {
  process(content: string): Promise<string>;
}

export class CoreProcessor implements MarkdownProcessor {
  async process(content: string): Promise<string> {
    // Placeholder for actual processing logic
    // In a real implementation, this might strip Obsidian-specific syntax
    return content;
  }
}

export interface GraphNode {
  id: string;
  links: string[];
}

export function extractLinks(content: string): string[] {
  // Simple regex for [[wikilinks]]
  const regex = /\[\[(.*?)\]\]/g;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

