/**
 * The Data types for all of our events.
 * Follows the format EventDataTypes[Category].[Event].EventData
 * Category + Event gives the corresponding event table in redshift
 */
export type EventDataTypes = {
  user: {
    click: UserClickData;
    visit: UserVisitData;
    impression: BaseEventAnyData;
    email_trigger: BaseEventAnyData;
    content_completed: BaseEventAnyData;
    submit: BaseEventAnyData;
    workspace_init: BaseEventAnyData;
    meaningful_content_loaded: BaseEventAnyData;
    practice_completed: BaseEventAnyData;
  };
  ad: {
    click: BaseEventAnyData;
    impression: BaseEventAnyData;
  };
  calendar: {
    reminder: BaseEventAnyData;
  };
  notification: {
    clicked: BaseEventAnyData;
    ion: BaseEventAnyData;
  };
  form: {
    submit: BaseEventAnyData;
  };
  sorting_quiz: {
    result: BaseEventAnyData;
    impression: BaseEventAnyData;
    answer: EventAnswerData;
  };
  onboarding_survey: {
    answer: BaseEventAnyData;
    recommendation: BaseEventAnyData;
    user_selected_recommendation: BaseEventAnyData;
  };
  exercise: {
    force_pass: BaseEventAnyData;
  };
  payments: {
    cancel_survey: BaseEventAnyData;
  };
  search: {
    visit: BaseEventAnyData;
    click: BaseEventAnyData;
    query: BaseEventAnyData;
    result: BaseEventAnyData;
  };
};

/**
 * Base event data shared by all events
 */
export type BaseEventData = {
  // properties set in the track function itself
  fullpath?: null;
  search?: null;
  path?: null;
  title?: null;
  url?: null;

  // properties set in the backend
  id?: null; // maps to user id
};

/**
 * Generic type to use for event data not typed yet
 */
export type BaseEventAnyData = BaseEventData & {
  [key: string]: any;
};

/**
 * Options to pass to the tracking function
 */
export type TrackingOptions = {
  /** tells backend not to merge user-identifying data onto the event payload */
  gdprSafe?: boolean;
};

/**
 * The Content IDs related to the current event, to help build the content context of the event.
 * These IDs get hashed into a single value and overwrite content_id before they are sent to
 * redshift in lib/content_group_id.rb
 */
export type TrackingContentIds = {
  assessment_id?: string;
  content_item_id?: string;
  exercise_id?: string;
  learning_standard_id?: string;
  module_id?: string;
  path_id?: string;
  program_id?: string;
  program_unit_id?: string;
  review_card_id?: string;
  track_id?: string;
};

/**
 * Shared data relevant for all user events
 */
export type UserSharedData = BaseEventData & {
  /** the click target of the event */
  target?: string;
  /** the page the event is coming from */
  page_name?: string;
  /** a context id for the event, for events that occur in more than one place */
  context?: string;
  /** the link being clicked on */
  href?: string;
  /** a version id for the element (ex. different version ids for redesigns) */
  version?: string;
  /* an object of content ids related to this event */
  content_ids?: TrackingContentIds;
};

/**
 * Data sent to user click event table
 * Note: any additional properties are added
 * to all rows of the table
 */
export type UserClickData = UserSharedData & {
  /* required */
  target: string;

  /* additional properties */
  id?: string;
  content_id?: string;
  weekly_goal?: string | number;
  element?: string;
  complete?: string;
  location?: string;
  video_url?: string;
  path_id?: string;
  path_slug?: string;
  event_name?: string;
  onboarding_entrypoint?: string;
  content_slug?: string;
  module_id?: string;
  track_slug?: string;
  button?: string;
  type?: string;
  current_challenge_day?: string | number;
  track_id?: string;
  course?: string;
  path_name?: string;
  event_id?: string;
  distinct_id?: string;
  unit?: string;
  slug?: string;
  lesson?: string;
  community_prompt?: string;
  contentItem?: any;
  unit_slug?: string;
  action?: string;
  course_slug?: string;
  course_progress?: number;
  assessment_id?: string;
};

/**
 * Data sent to user visit event table
 * Note: any additional properties are added
 * to all rows of the table
 */
export type UserVisitData = UserSharedData & {
  /* required */
  page_name: string;

  /* additional properties */
  plan?: string;
  path_id?: string;
  post?: string;
  story_type?: string;
  path_title?: string;
  category?: string;
  type?: string;
  onboarding_entrypoint?: string;
  course_slug?: string;
  course?: string;
  interstitial_name?: string;
  content_id?: string;
  section?: string;
  story_slug?: string;
  target?: string;
  unit?: string;
  distinct_id?: string;
  lesson?: string;
};

export type EventAnswerData = BaseEventData & {
  question_index: number;
  answer_index: number;
  answer: any;
  answer_slug: string;
};

export type User = {
  id?: string;
  auth_token: string;
  profile_image_url?: string;
  email?: string;
  is_pro?: boolean;
  username?: string;
  location: {
    in_eu: boolean;
    geo_country: string;
  };
  features: string[];
};

export type UseUserResponse = {
  user?: User;
  status: string;
};
