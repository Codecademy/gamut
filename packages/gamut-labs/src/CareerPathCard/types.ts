import {
  CourseDifficulty,
  EnrollmentStatus,
} from '../ContentGroupBaseCard/types';

export declare enum PathGoalEnum {
  Skill = 'skill',
  Career = 'career',
}

declare type CatalogContentData_Path_Fragment = {
  shortDescription?: string;
  difficulty?: CourseDifficulty;
  enrollmentStatus: EnrollmentStatus;
  id: string;
  lessonCount: number;
  projectCount: number;
  portfolioProjectCount: number;
  pro: boolean;
  slug: string;
  tag?: string;
  title: string;
  type: string;
  categories?: { title: string[] };
};

export type PathDataFragment = {
  goal: PathGoalEnum;
  imageUrl: string;
  courseCount: number;
} & CatalogContentData_Path_Fragment;
