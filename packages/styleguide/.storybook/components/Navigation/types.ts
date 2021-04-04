export type TaxonomyStatus =
  | 'stable'
  | 'deprecated'
  | 'volatile'
  | 'unknown'
  | 'static';

export interface Taxonomy {
  root: Heirarchy;
  heirarchy: Heirarchy;
}

export interface Heirarchy {
  title: string;
  index: string;
  subtitle: string;
  status: TaxonomyStatus;
  children: Heirarchy;
}
export interface ContentLink {
  title: string;
  subtitle: string;
  story: string;
  kind: string;
  status: TaxonomyStatus;
}

export interface ContentItem extends ContentLink {
  links: ContentLink[];
}

export interface TableOfContents extends Omit<Heirarchy, 'children'> {
  children: ContentLink[];
}
