export interface UserIntegrationSummary {
  email: string;
  id: string;
}

export interface SegmentAnalytics {
  identify(
    id: string,
    details: Record<string, string>,
    options: SegmentAnalyticsOptions
  ): void;
  initialize?: boolean;
  load(writeKey: string, options: SegmentAnalyticsOptions): void;
  page(): void;
}

export interface SegmentDestination {
  category: string;
  id: string;
}

export interface SegmentAnalyticsOptions {
  integrations: Record<string, boolean>;
}

export interface SegmentWindow {
  analytics?: SegmentAnalytics;
  OnetrustActiveGroups?: string[];
}
