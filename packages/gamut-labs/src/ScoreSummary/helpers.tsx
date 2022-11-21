import pluralize from 'pluralize';

export type ContentItemType =
  | 'article'
  | 'context_item'
  | 'informational'
  | 'lesson'
  | 'lock'
  | 'pro'
  | 'project_component'
  | 'project'
  | 'quiz'
  | 'resource'
  | 'reviewable_project'
  | 'seminar'
  | 'video'
  | 'external_resource'
  | 'kanban_project';

export interface ResumeUrlPathParams {
  journeySlug?: string;
  pathSlug?: string;
  trackSlug?: string;
  moduleSlug?: string;
  contentItemType?: ContentItemType;
  contentItemSlug?: string;
}

const getContentItemTypeRoutePart = (type?: ContentItemType) => {
  return type ? pluralize(type, 2) : '';
};

export const createResumeUrlPath = ({
  journeySlug,
  pathSlug,
  trackSlug,
  moduleSlug,
  contentItemType,
  contentItemSlug,
}: ResumeUrlPathParams) => {
  const contentItemTypeRoute = getContentItemTypeRoutePart(contentItemType);
  const journeyUrl = journeySlug ? `/journeys/${journeySlug}` : '';

  if (
    pathSlug &&
    trackSlug &&
    moduleSlug &&
    contentItemType &&
    contentItemTypeRoute &&
    contentItemSlug
  )
    return `${journeyUrl}/paths/${pathSlug}/tracks/${trackSlug}/modules/${moduleSlug}/${contentItemTypeRoute}/${contentItemSlug}`;

  if (pathSlug && trackSlug && moduleSlug)
    return `${journeyUrl}/paths/${pathSlug}/tracks/${trackSlug}/modules/${moduleSlug}`;

  if (pathSlug && trackSlug)
    return `${journeyUrl}/paths/${pathSlug}/tracks/${trackSlug}`;

  if (pathSlug) return `${journeyUrl}/paths/${pathSlug}`;

  return journeyUrl;
};
