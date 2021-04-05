export type TaxonomyStatus =
  | 'current'
  | 'deprecated'
  | 'updating'
  | 'unknown'
  | 'static';

export interface Taxonomy {
  root: Heirarchy;
  heirarchy: Heirarchy;
}

export interface Heirarchy {
  title: string;
  id: string;
  subtitle: string;
  status: TaxonomyStatus;
  children: Heirarchy;
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

export interface TableOfContentsShape extends Omit<Heirarchy, 'children'> {
  children: ContentItem[];
}
