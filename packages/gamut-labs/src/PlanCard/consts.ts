interface Detail {
  id: string;
  title: string;
  tag: string;
  isLite: boolean;
  features: Record<string, boolean>;
  newFeatures?: Record<string, boolean>;
}

type PlanDetails = Record<string, Detail>;

export const planDetails: PlanDetails = {
  pro: {
    id: 'pro',
    title: 'Pro',
    tag: 'Learn a skill',
    isLite: false,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
    },
  },
  'pro-gold': {
    id: 'pro-gold',
    title: 'Pro',
    tag: 'Build a career',
    isLite: false,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
      'Career paths': true,
      'Technical interview prep': true,
      'Code challenges': true,
    },
    newFeatures: {
      'Professional certifications': true,
      'Career services': true,
      Assessments: true,
    },
  },
  'pro-silver': {
    id: 'pro-silver',
    title: 'Plus',
    tag: 'Learn a skill',
    isLite: true,
    features: {
      'Real-world projects': true,
      'All courses': true,
      'Skill paths': true,
      'Career paths': false,
      'Technical interview prep': false,
      'Code challenges': false,
    },
    newFeatures: {
      'Professional certifications': false,
      'Career services': false,
      Assessments: false,
    },
  },
};
