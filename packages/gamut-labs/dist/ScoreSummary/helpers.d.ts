export declare type ContentItemType = 'article' | 'context_item' | 'informational' | 'lesson' | 'lock' | 'pro' | 'project_component' | 'project' | 'quiz' | 'resource' | 'reviewable_project' | 'seminar' | 'video' | 'external_resource' | 'kanban_project';
export interface ResumeUrlPathParams {
    journeySlug?: string;
    pathSlug?: string;
    trackSlug?: string;
    moduleSlug?: string;
    contentItemType?: ContentItemType;
    contentItemSlug?: string;
}
export declare const createResumeUrlPath: ({ journeySlug, pathSlug, trackSlug, moduleSlug, contentItemType, contentItemSlug, }: ResumeUrlPathParams) => string;
