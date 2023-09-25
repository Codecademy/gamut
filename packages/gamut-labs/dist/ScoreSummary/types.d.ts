export interface EinConfig {
    container_type: string;
    server?: string;
    codex?: string;
    extensions?: {};
}
export interface BaseContentItemProgress {
    content_item_id: string;
    user_id: string;
    started: boolean;
    completed: boolean;
    user_completed: boolean;
    started_at?: string;
    user_completed_at?: string;
    completed_at?: string;
    last_updated?: string;
    progress_percentage?: number;
}
export interface ProjectChecklist {
    [id: string]: string | boolean;
}
export interface QuizAttempt {
    pct: number;
    correct: number;
    total: number;
    passed: boolean;
    at?: string;
}
export interface QuizProgress extends BaseContentItemProgress {
    type: 'quiz';
    total?: number;
    correct?: number;
    pct?: number;
    highest_pct?: number;
    passed?: boolean;
    passed_any?: boolean;
    taken?: boolean;
    quiz_attempts: QuizAttempt[];
}
export interface ProjectProgress extends BaseContentItemProgress {
    type: 'project';
    checklist: ProjectChecklist;
    status?: number;
    tasks_complete?: number;
    tasks_total?: number;
    progress_pct: number;
}
export interface LessonProgress extends BaseContentItemProgress {
    type: 'lesson';
    exercises_completed: number;
    current_exercise_checkpoints_completed: number;
    exercises_total: number;
    progress_pct: number;
}
export interface ArticleProgress extends BaseContentItemProgress {
    type: 'article';
}
export interface VideoProgress extends BaseContentItemProgress {
    type: 'video';
}
export interface InformationalProgress extends BaseContentItemProgress {
    type: 'informational';
}
export interface ExternalResourceProgress extends BaseContentItemProgress {
    type: 'external_resource';
}
export declare type ContentItemProgress = ProjectProgress | QuizProgress | LessonProgress | ArticleProgress | VideoProgress | InformationalProgress | ExternalResourceProgress;
export interface ContentItemMeta {
    task_count?: number;
    ex_count?: number;
}
export declare type ContentItemType = 'article' | 'context_item' | 'informational' | 'lesson' | 'lock' | 'pro' | 'project_component' | 'project' | 'quiz' | 'resource' | 'reviewable_project' | 'seminar' | 'video' | 'external_resource' | 'kanban_project';
export declare type ContentItemResourceType = 'book' | 'documentation' | 'tutorial' | 'general_resource';
export interface BaseContentItem {
    id: string;
    slug: string;
    created_at: string;
    type: ContentItemType;
    last_modified_at?: string;
    published?: boolean;
    title: string;
    template_vars?: object;
    time?: number;
    meta?: ContentItemMeta;
    description?: string;
    author_ids?: string[];
    tag_ids?: string[];
    is_deprecated?: boolean;
    feedback_link?: string;
    starter_code_link?: string;
    reviewable?: boolean;
    due_date?: string;
    qa_forum_url?: string;
    is_free?: boolean;
    assessment_ids?: string[];
    thumbnail_url?: string;
    progress?: ContentItemProgress;
    resource_type?: ContentItemResourceType;
    learningStandardIds?: string[];
    /**
     * @deprecated
     */
    content?: object;
    /**
     * @deprecated
     */
    uuid?: string;
}
export interface ProjectTask {
    done?: boolean;
    task_key: string;
    text: string;
    hint?: string;
}
export interface ProjectSelfAssessment {
    heading?: string;
    tasks: ProjectTask[];
}
export interface Workspace {
    id: string;
    slug: string;
    type?: string;
    ein_config?: EinConfig;
}
export interface ProjectInformation {
    self_assessments: ProjectSelfAssessment[];
    components: LayoutComponent[];
    objective: string;
    workspace?: Workspace;
    ein_config: EinConfig;
    download_path?: string;
    preview_url?: string;
    pro_free_project_trial?: boolean;
    thumbnail_url?: string;
    video_url?: string;
    is_free?: boolean;
}
export interface ProjectContentItem extends BaseContentItem {
    description: string;
    type: 'project';
    project_information: ProjectInformation;
    standalone: boolean;
}
export declare type BriefProject = ProjectContentItem & {
    projectInformation: ProjectInformation;
};
export interface FakeResponse {
    id: string;
    delay: number;
    match_pattern: string;
    output_content: string;
    output_type: 'stderr' | 'stdout';
}
export interface BriefComponent {
    type: 'Brief';
    project: BriefProject;
}
export interface NarrativeComponent {
    id: string;
    type: 'Narrative';
    content: string;
    instructions?: string;
}
export interface ImageComponent {
    id: string;
    type: 'Image';
    image_url: string;
    alt_text: string;
}
export interface PersistentCodeEditorComponent {
    id: string;
    type: 'PersistentCodeEditor';
    files: string[];
    navigator_disabled?: boolean;
    no_run_button?: boolean;
}
export interface ReadOnlyCodeEditorComponent {
    id: string;
    type: 'ReadOnlyCodeEditor';
    file_path: string;
}
export interface OutputTerminalComponent {
    id?: string;
    type: 'OutputTerminal';
}
export interface SQLPreviewComponent {
    id: string;
    type: 'SQLPreview';
}
export interface TerminalComponent {
    id: string;
    type: 'Terminal';
    shell: string;
    prevent_checkpoint_run?: boolean;
    fake_responses: FakeResponse[];
}
export interface VideoComponent {
    id: string;
    type: 'Video';
    video_urls: string[];
    autoplay?: boolean;
    mute?: boolean;
    loop?: boolean;
    show_controls?: boolean;
}
export interface WebBrowserComponent {
    id: string;
    type: 'WebBrowser';
    display_url: string;
    show_preview_button?: boolean;
    hide_browser_bar?: boolean;
}
export interface ExpoCodeEditorComponent {
    id: string;
    type: 'ExpoCodeEditor';
    files: string[];
}
export interface ExpoPreviewComponent {
    id: string;
    type: 'ExpoPreview';
    display_url: string;
    hide_browser_bar?: boolean;
}
export interface ReplTerminalComponent {
    type: 'ReplTerminal';
    shell: string;
}
export interface SandboxCodeEditorComponent {
    type: 'SandboxCodeEditor';
    files?: string[];
    runFileCommand?: (file: string) => string;
}
export interface SandboxOutputTerminalComponent {
    type: 'SandboxOutputTerminal';
}
export declare type LayoutComponent = BriefComponent | NarrativeComponent | ImageComponent | PersistentCodeEditorComponent | ReadOnlyCodeEditorComponent | OutputTerminalComponent | SQLPreviewComponent | TerminalComponent | VideoComponent | WebBrowserComponent | ExpoCodeEditorComponent | ExpoPreviewComponent | ReplTerminalComponent | SandboxCodeEditorComponent | SandboxOutputTerminalComponent;
export interface AssessmentAnswer {
    text: string;
    reason?: string | null;
    hint?: string;
}
export interface AssessmentCodeSnippet {
    id?: string;
    text: string;
    language: string;
}
export declare type TesterType = 'activeBatsTest' | 'batsTest' | 'codexSCT' | 'componentTest' | 'dartTest' | 'defaultFail' | 'defaultPass' | 'executeFileTest' | 'goTest' | 'junitTest' | 'junitMavenTest' | 'jestTest' | 'mochaTest' | 'passiveBatsTest' | 'phpunitTest' | 'pythonTest' | 'pythonUnitTest' | 'rScriptTest' | 'rspecTest' | 'webSCT';
export interface ContentTestOptions {
    command?: string;
    failure_message?: string;
    passive?: boolean;
    withBabel?: boolean;
    includeFiles?: string[];
}
export interface Test {
    /**
     * @property Some tests, like Checkpoints, have an id
     */
    id?: string;
    test_type: TesterType;
    test_code: string;
    test_options: ContentTestOptions;
    test_notes?: string;
}
export interface BaseAssessment {
    id: string;
    published: boolean;
    created_at: string;
    components: LayoutComponent[];
    last_modified_at: string;
    prompt?: string;
    standalone?: boolean;
    image?: {
        url: string;
        alt: string;
    } | null;
    test?: Test;
    sourceId: string;
}
export declare type AssessmentFillInTheCode = BaseAssessment & {
    type: 'fill_in_code';
    answers: AssessmentAnswer[];
    snippet_template: string;
    decoy_answers: string[];
    code_language: string;
};
export declare type AssessmentECA = BaseAssessment & {
    type: 'executable_code';
    ein_config: EinConfig;
};
export declare type AssessmentMultipleChoice = BaseAssessment & {
    type: 'multiple_choice';
    code_snippet: AssessmentCodeSnippet | null;
    answers: AssessmentAnswer[];
    correct_answer: number;
    latex_block: {
        text: string;
    } | null;
};
export declare type Assessment = AssessmentECA | AssessmentFillInTheCode | AssessmentMultipleChoice;
export interface CorrectAnswerCountsBySubContent {
    [key: string]: {
        title: string;
        correct: number;
        total: number;
        slug: string;
    };
}
export interface SubContentAssessments {
    assessments: Assessment[];
    contains_new_content: boolean;
    id: string;
    slug: string;
    title: string;
}
export declare type UntestedSubContent = Pick<SubContentAssessments, 'id' | 'slug' | 'title'>;
