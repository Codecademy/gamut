export interface Heirarchy {
  title: string;
  index: string;
  subtitle: string;
  status: string;
  children: Heirarchy;
}

export interface ContentLink {
  title: string;
  subtitle: string;
  story: string;
  kind: string;
  status: 'stable' | 'deprecated' | 'volatile' | 'unknown';
}

export interface ContentItem extends ContentLink {
  links: ContentLink[];
}

export interface TableOfContents extends Omit<Heirarchy, 'children'> {
  children: ContentLink[];
}
