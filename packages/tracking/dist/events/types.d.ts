/**
 * The Data types for all of our events.
 * Follows the format EventDataTypes[Category].[Event].EventData
 * Category + Event gives the corresponding event table in redshift
 */
export declare type EventDataTypes = {
    user: {
        click: UserClickData;
        visit: UserVisitData;
        impression: UserImpressionData;
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
    page: {
        career_path_visited: PagePathVisitedData;
        skill_path_visited: PagePathVisitedData;
        course_page_visited: CoursePageVisitedData;
    };
    business: {
        filter_event: BusinessFilterData;
        search_event: BusinessSearchData;
    };
};
/**
 * Base event data shared by all events
 */
export declare type BaseEventData = {
    fullpath?: null;
    search?: null;
    path?: null;
    title?: null;
    url?: null;
    referrer?: null;
    id?: null;
};
/**
 * Generic type to use for event data not typed yet
 */
export declare type BaseEventAnyData = BaseEventData & {
    [key: string]: any;
};
/**
 * Options to pass to the tracking function
 */
export declare type TrackingOptions = {
    /** tells backend not to merge user-identifying data onto the event payload */
    gdprSafe?: boolean;
};
/**
 * The Content IDs related to the current event, to help build the content context of the event.
 * These IDs get hashed into a single value and overwrite content_id before they are sent to
 * redshift in lib/content_group_id.rb
 */
export declare type TrackingContentIds = {
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
export declare type UserSharedData = BaseEventData & {
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
    /** an object of content ids related to this event */
    content_ids?: TrackingContentIds;
    /** the repo that this event is being fired from */
    source_codebase?: string;
};
/**
 * Data sent to user click event table
 * NOTE: avoid adding additional properties to these objects
 * Instead, reuse existing properties, or make any additional properties generic so that they can be reused.
 * https://www.notion.so/codecademy/Guide-to-Event-Tracking-Schema-5d40b09a297743f7a30a2690208194c8#800bbf6cdf2e44de9823cd75bcc574e5
 */
export declare type UserClickData = UserSharedData & {
    target: string;
    id?: string;
    distinct_id?: string;
    content_id?: string;
    slug?: string;
    name?: string;
    action?: string;
    type?: string;
    location?: string;
    element?: string;
    weekly_goal?: string | number;
    complete?: string;
    video_url?: string;
    path_id?: string;
    path_slug?: string;
    event_name?: string;
    onboarding_entrypoint?: string;
    content_slug?: string;
    module_id?: string;
    track_slug?: string;
    module_slug?: string;
    button?: string;
    current_challenge_day?: string | number;
    track_id?: string;
    course?: string;
    path_name?: string;
    event_id?: string;
    unit?: string;
    lesson?: string;
    community_prompt?: string;
    contentItem?: any;
    unit_slug?: string;
    course_slug?: string;
    course_progress?: number;
    assessment_id?: string;
    container_slugs?: string[];
};
/**
 * Data sent to user visit event table
 * NOTE: avoid adding additional properties to these objects
 * Instead, reuse existing properties, or make any additional properties generic so that they can be reused.
 * https://www.notion.so/codecademy/Guide-to-Event-Tracking-Schema-5d40b09a297743f7a30a2690208194c8#800bbf6cdf2e44de9823cd75bcc574e5
 */
export declare type UserVisitData = UserSharedData & {
    page_name: string;
    category?: string;
    distinct_id?: string;
    type?: string;
    target?: string;
    section?: string;
    plan?: string;
    path_id?: string;
    post?: string;
    story_type?: string;
    path_title?: string;
    onboarding_entrypoint?: string;
    course_slug?: string;
    course?: string;
    interstitial_name?: string;
    content_id?: string;
    story_slug?: string;
    unit?: string;
    lesson?: string;
};
export declare type UserImpressionData = {
    page_name: string;
    slug?: string;
    target: string;
    context?: string;
    path_slug?: string;
    track_slug?: string;
    module_slug?: string;
    source_codebase?: string;
};
export declare type EventAnswerData = BaseEventData & {
    question_index: number;
    answer_index: number;
    answer: any;
    answer_slug: string;
};
export declare type User = {
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
export declare type UseUserResponse = {
    user?: User;
    status: string;
};
export declare type PagePathVisitedData = BaseEventData & {
    path_id: string;
    path_full_title: string;
};
export declare type CoursePageVisitedData = BaseEventData & {
    course_id: string;
    course_full_title: string;
};
export declare type FilterType = string | string[] | number | boolean;
export declare type BusinessFilterData = BaseEventData & {
    filter_key: string;
    filter_value: FilterType;
};
export declare type BusinessSearchData = BaseEventData & {
    search_query: string;
};
