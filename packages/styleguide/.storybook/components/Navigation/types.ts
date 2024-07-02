export type TaxonomyStatus = 'current' | 'deprecated' | 'updating' | 'static';

export interface Taxonomy {
  root: Hierarchy;
  hierarchy: Hierarchy;
  components: ComponentRegistry;
}

export interface Hierarchy {
  type: 'root' | 'index' | 'element';
  title: string;
  id: string;
  subtitle: string;
  status: TaxonomyStatus;
  children: Hierarchy;
}

export interface ComponentRegistry {
  [ComponentName: string]: any;
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
