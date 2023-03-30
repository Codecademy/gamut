export enum CourseDifficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum EnrollmentStatus {
  InProgress = 'inProgress',
  Completed = 'completed',
  None = 'none',
}

export interface SalaryRange {
  lowerBound: number;
  upperBound: number;
}
