export type TaxonomyStatus =
  | 'current'
  | 'deprecated'
  | 'updating'
  | 'unknown'
  | 'static';

export interface Taxonomy {
  root: Hierarchy;
  hierarchy: Hierarchy;
}

export interface Hierarchy {
  title: string;
  id: string;
  subtitle: string;
  status: TaxonomyStatus;
  children: Hierarchy;
}
export interface ContentLink {
  title: string;
  subtitle: string;
  id: string;
  status: TaxonomyStatus;
}

export interface ContentItem extends ContentLink {
  links: ContentLink[];
}

export interface TableOfContentsShape extends Omit<Hierarchy, 'children'> {
  children: ContentItem[];
}
