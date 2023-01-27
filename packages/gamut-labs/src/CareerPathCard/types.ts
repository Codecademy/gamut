import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

export enum PathGoalEnum {
  Skill = 'skill',
  Career = 'career',
}

declare type CatalogContentData_Path_Fragment = {
  shortDescription?: string | null;
  difficulty?: CourseDifficulty | null;
  enrollmentStatus: EnrollmentStatus;
  id: string;
  lessonCount: number;
  projectCount: number;
  portfolioProjectCount: number;
  pro: boolean;
  slug: string;
  tag?: string | null;
  title: string;
  type: string;
  categories?: { title: string[] } | null;
};

export type PathDataFragment = {
  goal: PathGoalEnum;
  imageUrl: string;
  courseCount: number;
} & CatalogContentData_Path_Fragment;
