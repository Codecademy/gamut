/**
 * Generic Type Example for BarChart with Custom Sorting
 *
 * This file demonstrates how the generic types work with custom properties.
 * TypeScript will automatically infer the bar type from barValues, and
 * sort functions will receive the correct type with custom properties.
 *
 * THIS WILL BE DELETED BEFORE SHIPPING
 */

import { BarChart } from './index';
import type { BarProps } from './shared/types';

// ============================================================================
// Example 1: Date-based sorting with automatic type inference
// ============================================================================

// Define bars with custom dateAdded property
const barsWithDates = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    dateAdded: new Date('2023-01-15'),
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    dateAdded: new Date('2023-03-20'),
  },
  {
    yLabel: 'React',
    seriesOneValue: 450,
    dateAdded: new Date('2023-06-10'),
  },
  {
    yLabel: 'TypeScript',
    seriesOneValue: 300,
    dateAdded: new Date('2023-08-05'),
  },
  {
    yLabel: 'SQL',
    seriesOneValue: 600,
    dateAdded: new Date('2023-02-28'),
  },
];

// TypeScript infers the type automatically - no need to specify it!
export const DateSortingExample = () => {
  return (
    <BarChart
      barValues={barsWithDates}
      description="Sort by when each skill was added to your profile"
      maxRange={2000}
      sortFns={[
        'none',
        {
          label: 'Recently Added',
          value: 'recent',
          // bars parameter is automatically typed as:
          // (BarProps & { dateAdded: Date })[]
          // No type assertions needed!
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // TypeScript knows dateAdded exists and is a Date!
              const aDate = a.dateAdded;
              const bDate = b.dateAdded;
              if (!aDate && !bDate) return 0;
              if (!aDate) return 1;
              if (!bDate) return -1;
              return bDate.getTime() - aDate.getTime();
            });
          },
        },
        {
          label: 'Oldest First',
          value: 'oldest',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              const aDate = a.dateAdded;
              const bDate = b.dateAdded;
              if (!aDate && !bDate) return 0;
              if (!aDate) return 1;
              if (!bDate) return -1;
              return aDate.getTime() - bDate.getTime();
            });
          },
        },
      ]}
      title="Skills by Date Added"
      unit="XP"
    />
  );
};

// ============================================================================
// Example 2: Category-based sorting with multiple custom properties
// ============================================================================

const barsWithCategory = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    category: 'backend' as const,
    priority: 1,
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    category: 'frontend' as const,
    priority: 2,
  },
  {
    yLabel: 'React',
    seriesOneValue: 450,
    category: 'frontend' as const,
    priority: 3,
  },
  {
    yLabel: 'TypeScript',
    seriesOneValue: 300,
    category: 'frontend' as const,
    priority: 4,
  },
  {
    yLabel: 'SQL',
    seriesOneValue: 600,
    category: 'backend' as const,
    priority: 5,
  },
];

export const CategorySortingExample = () => {
  return (
    <BarChart
      barValues={barsWithCategory}
      description="Sort by category or priority"
      maxRange={2000}
      sortFns={[
        'none',
        {
          label: 'By Category',
          value: 'category',
          // bars is typed with both category and priority properties
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // TypeScript knows category exists!
              if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
              }
              // TypeScript knows priority exists!
              return a.priority - b.priority;
            });
          },
        },
        {
          label: 'High Priority First',
          value: 'priority',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // Direct access to priority - fully typed!
              return a.priority - b.priority;
            });
          },
        },
      ]}
      title="Skills by Category"
      unit="XP"
    />
  );
};

// ============================================================================
// Example 3: Complex sorting with nested properties
// ============================================================================

const barsWithMetadata = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    metadata: {
      addedDate: new Date('2023-01-15'),
      tags: ['backend', 'data-science'],
      rating: 4.5,
    },
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    metadata: {
      addedDate: new Date('2023-03-20'),
      tags: ['frontend', 'backend'],
      rating: 5.0,
    },
  },
  {
    yLabel: 'React',
    seriesOneValue: 450,
    metadata: {
      addedDate: new Date('2023-06-10'),
      tags: ['frontend'],
      rating: 4.8,
    },
  },
];

export const ComplexSortingExample = () => {
  return (
    <BarChart
      barValues={barsWithMetadata}
      description="Sort by metadata properties"
      maxRange={2000}
      sortFns={[
        'none',
        {
          label: 'By Rating',
          value: 'rating',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // TypeScript knows metadata.rating exists!
              return b.metadata.rating - a.metadata.rating;
            });
          },
        },
        {
          label: 'By Date Added',
          value: 'date',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // TypeScript knows metadata.addedDate exists!
              return (
                b.metadata.addedDate.getTime() - a.metadata.addedDate.getTime()
              );
            });
          },
        },
        {
          label: 'Has Backend Tag',
          value: 'backend-tag',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // TypeScript knows metadata.tags exists!
              const aHasBackend = a.metadata.tags.includes('backend');
              const bHasBackend = b.metadata.tags.includes('backend');
              if (aHasBackend && !bHasBackend) return -1;
              if (!aHasBackend && bHasBackend) return 1;
              return 0;
            });
          },
        },
      ]}
      title="Skills with Metadata"
      unit="XP"
    />
  );
};

// ============================================================================
// Example 4: Explicit type annotation (when needed)
// ============================================================================

// Sometimes you might want to be explicit about the type
// The type is automatically inferred from barValues, but you can still
// explicitly type the array if needed for clarity
type BarWithScore = BarProps & {
  score: number;
  lastUpdated: Date;
};

const barsWithScore: BarWithScore[] = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    score: 85,
    lastUpdated: new Date('2024-01-01'),
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    score: 95,
    lastUpdated: new Date('2024-01-15'),
  },
];

export const ExplicitTypeExample = () => {
  return (
    <BarChart
      barValues={barsWithScore}
      description="Explicitly typed bars with score and update date"
      maxRange={2000}
      sortFns={[
        'none',
        {
          label: 'By Score',
          value: 'score',
          // TypeScript automatically infers BarWithScore[] from barValues
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // Direct access to score - fully typed!
              return b.score - a.score;
            });
          },
        },
        {
          label: 'Recently Updated',
          value: 'updated',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // Direct access to lastUpdated - fully typed!
              return b.lastUpdated.getTime() - a.lastUpdated.getTime();
            });
          },
        },
      ]}
      title="Skills with Scores"
      unit="XP"
    />
  );
};

// ============================================================================
// Example 6: Purposefully wrong example to show type errors
// ============================================================================

const barsWithWrongCategory = [
  {
    yLabel: 'Python',
    seriesOneValue: 1500,
    category: 'backend' as const,
    priority: 1,
  },
  {
    yLabel: 'JavaScript',
    seriesOneValue: 2000,
    category: 'frontend' as const,
    priority: 2,
  },
  {
    yLabel: 'React',
    seriesOneValue: 450,
    category: 'frontend' as const,
    priority: 3,
  },
  {
    yLabel: 'TypeScript',
    seriesOneValue: 300,
    category: 'frontend' as const,
    priority: 4,
  },
  {
    yLabel: 'SQL',
    seriesOneValue: 600,
    catty: 'backend' as const,
    purr: 5,
  },
];

export const WrongCategorySortingExample = () => {
  return (
    <BarChart
      barValues={barsWithWrongCategory}
      description="Sort by category or priority"
      maxRange={2000}
      sortFns={[
        'none',
        {
          label: 'By Category',
          value: 'category',
          // bars is typed with both category and priority properties
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              if (a.category !== b.category) {
                // @ts-expect-error - we know this is wrong
                return a.category.localeCompare(b.category);
              }
              // @ts-expect-error - we know priority might not exist
              return a.priority - b.priority;
            });
          },
        },
        {
          label: 'High Priority First',
          value: 'priority',
          sortFn: (bars) => {
            return [...bars].sort((a, b) => {
              // @ts-expect-error - we know priority might not exist
              return a.priority - b.priority;
            });
          },
        },
      ]}
      title="Skills by Category"
      unit="XP"
    />
  );
};
