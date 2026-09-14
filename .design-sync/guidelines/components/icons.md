# Icons

`@codecademy/gamut-icons` ships 371 icons (335 Regular + 36 Mini), enumerated
below by exact export name — generated from the built `.d.ts` exports, not
transcribed by hand. Import by destructuring off `window.CodecademyGamut`
(icons are bundled in via `cfg.extraEntries`, same as components):

```jsx
const { SearchIcon, MiniKebabMenuIcon } = window.CodecademyGamut;
```

## Choosing between Regular and Mini

- **Regular** — standalone icons at normal UI scale (buttons, nav, empty
  states, illustrations-adjacent contexts).
- **Mini** — a smaller, purpose-built set for dense contexts: menu items,
  inline row controls, compact toolbars. If a Mini variant exists for what
  you need (e.g. `MiniEditIcon` vs `EditIcon`), prefer it inside `MenuItem`,
  table row controls, or anywhere space is tight.

## Identifying the correct icon from a design

Don't rely on Figma layer names (`data-name`) — they go stale when icons are
swapped in Figma without the layer name updating (e.g. a layer still labeled
`"Mini/MiniDeleteIcon"` after being swapped to a different icon). Determine
the correct icon by:

1. Reading the design image — visually identify the shape.
2. Using contextual clues — tooltip text (e.g. "Show options" → `MiniKebabMenuIcon`), element purpose, surrounding UI pattern.
3. Cross-referencing the export list below.
4. Treating a stale-looking layer name as a hint only — trust the visual/contextual evidence over it.
5. When genuinely uncertain, flag for confirmation rather than guessing.

Before using any icon, confirm the exact name exists in the list below — if
not, pick the closest match rather than inventing a name.

## Regular (335)

`AccountingCoinsIcon`, `AddBoldIcon`, `AddIcon`, `AdminIcon`
`AiChatSparkFilledIcon`, `AiChatSparkIcon`, `AiEditSparkIcon`, `AlarmClockIcon`
`AlertFilledIcon`, `AlertIcon`, `AmexIcon`, `AnalyticsGraphIcon`
`AppleIcon`, `ArchiveIcon`, `ArrowChevronDownFilledIcon`, `ArrowChevronDownIcon`
`ArrowChevronLeftIcon`, `ArrowChevronRightBoldIcon`, `ArrowChevronRightIcon`, `ArrowChevronUpIcon`
`ArrowDashRightIcon`, `ArrowDownIcon`, `ArrowLeftIcon`, `ArrowRightIcon`
`ArrowThickCircleRightIcon`, `ArrowThickCircleUpIcon`, `ArrowUpIcon`, `ArticleIcon`
`ArtificialIntelligenceIcon`, `AssessmentsIcon`, `BadgeIcon`, `BashShellIcon`
`BellIcon`, `BookBookmarkIcon`, `BookClosedBookmarkIcon`, `BookFlipPageIcon`
`BookLibraryIcon`, `BriefcaseIcon`, `BrowserPageLayoutIcon`, `BugIcon`
`BulbIcon`, `CalendarIcon`, `CallIcon`, `CertificateIcon`
`ChallengeProjectIcon`, `ChatIcon`, `CheckCircledIcon`, `CheckFilledIcon`
`CheckHeavyIcon`, `CheckIcon`, `ChecklistIcon`, `CIcon`
`ClockIcon`, `CloseCircleIcon`, `ClosedCaptionDisabledIcon`, `ClosedCaptionIcon`
`CloseIcon`, `CloseSquareIcon`, `CloudCheckIcon`, `CloudComputingIcon`
`CloudIcon`, `ClubsSealIcon`, `CoachingIcon`, `CommentsIcon`
`CommonFileSettingsIcon`, `CommonFileTextHeartIcon`, `CommonFileTextQuestionIcon`, `CommunityIcon`
`ComputerScienceIcon`, `ConversationChatIcon`, `CopyIcon`, `CPlusIcon`
`CreditCard1Icon`, `CreditCardIcon`, `CSharpIcon`, `CubeIcon`
`CybersecurityIcon`, `DataAnalyticsIcon`, `DataEngineeringIcon`, `DataFileBarsShareIcon`
`DataScienceIcon`, `DataTransferVerticalIcon`, `DataVisualizationIcon`, `DeleteFilledIcon`
`DeleteIcon`, `DevopsIcon`, `DiamondIcon`, `DiscordIcon`
`DiscordOutlineIcon`, `DiscountStarPremiumFilledIcon`, `DownloadIcon`, `DuplicateIcon`
`EaIcon`, `EarthIcon`, `EditIcon`, `EditorIcon`
`EmailFilledIcon`, `EmailIcon`, `ExperienceIcon`, `ExploreIcon`
`FacebookIcon`, `FallbackSkillIcon`, `FaviconIcon`, `FaviconSolidIcon`
`FileAddIcon`, `FileCodeAdd1Icon`, `FileDownloadIcon`, `FileEditIcon`
`FileIcon`, `FileLockIcon`, `FilePyIcon`, `FileSearchIcon`
`FileTextInfoIcon`, `FilterIcon`, `FitnessDumbbellIcon`, `FitNormalIcon`
`FitShrinkIcon`, `FlutterIcon`, `FolderAddIcon`, `FolderIcon`
`ForkIcon`, `ForumsChatIcon`, `FullscreenIcon`, `FullscreenSquareIcon`
`GameDevelopmentIcon`, `GaugeDashboardIcon`, `GearIcon`, `GithubIcon`
`GithubOutlineIcon`, `GitIcon`, `GlassesIcon`, `GoIcon`
`GolfHoleBallIcon`, `GoogleIcon`, `GplusIcon`, `GraphStatsAscendIcon`
`GrowthIcon`, `HalloweenBroomIcon`, `HammerWrenchIcon`, `HierarchyIcon`
`HouseEntranceIcon`, `HtmlCssIcon`, `HyperlinkIcon`, `IbmIcon`
`ImageIcon`, `InfoCircleIcon`, `InformationalIcon`, `InProgressIcon`
`InstagramIcon`, `InstructionsIcon`, `InteractiveCursorIcon`, `IntersectionIcon`
`ItIcon`, `JavaIcon`, `JavascriptIcon`, `JiraIcon`
`KeyboardIcon`, `KotlinIcon`, `LayoutModuleAltIcon`, `LayoutModuleIcon`
`LearnIcon`, `LessonIcon`, `LevelIcon`, `LifePreserverIcon`
`LinkedinIcon`, `LinkedinOutlineIcon`, `LinkIcon`, `ListeningIcon`
`ListIcon`, `LiveLearningIcon`, `LiveVideoIcon`, `LocationPinIcon`
`LockHeavyIcon`, `LockIcon`, `LogoutIcon`, `MachineLearningIcon`
`MaintenanceIcon`, `MapFingerIcon`, `MapPinIcon`, `MarkdownIcon`
`MarkerIcon`, `MastercardIcon`, `MathIcon`, `MediaLibraryIcon`
`MediumIcon`, `MegaphoneIcon`, `MenuIcon`, `MetaIcon`
`MicrophoneIcon`, `MicrosoftIcon`, `MinimizeBarIcon`, `MinimizeIcon`
`MobileDevelopmentIcon`, `MoneyBackGuaranteeIcon`, `MoneyWalletIcon`, `MonitorBookIcon`
`MoveLeftIcon`, `MoveRightIcon`, `MultipleActionsViewIcon`, `MultipleUsersIcon`
`NarrativeIcon`, `NetworkUserIcon`, `NotebookIcon`, `ObjectiveIcon`
`OfficeBuildingDoubleIcon`, `OneTimeIcon`, `OnlineClassStudentIcon`, `OpenAiFullIcon`
`OpenAiIcon`, `OpenIcon`, `OptimizationClockIcon`, `OverviewIcon`
`PaginateFilterTextIcon`, `ParagraphJustifiedAlignIcon`, `PathChangeIcon`, `PathCompleteIcon`
`PathIcon`, `PauseIcon`, `PaypalLogoIcon`, `PdfIcon`
`PeopleIcon`, `PercipioIcon`, `PersonChatIcon`, `PersonFilledIcon`
`PersonIcon`, `PersonPonytailIcon`, `PhoneIcon`, `PhpIcon`
`PieLineGraphIcon`, `PinIcon`, `PipExitIcon`, `PipIcon`
`PlayCircledIcon`, `PlayIcon`, `PortfolioProjectIcon`, `ProfessionalCertificateIcon`
`ProgrammingBrowserIcon`, `ProgrammingTeamChatIcon`, `ProjectsIcon`, `PythonIcon`
`QrCodeScanIcon`, `QuestionMarkIcon`, `QuizIcon`, `RadarIcon`
`RailsIcon`, `RankingWinnerIcon`, `RatingStarCircleIcon`, `RatingStarGiveIcon`
`ReactIcon`, `RecordingIcon`, `RedditIcon`, `RedditSolidIcon`
`RedoIcon`, `RefreshIcon`, `ReportIcon`, `ResetIcon`
`ResizableHandleIcon`, `ResponsiveIcon`, `RibbonDoubleFilledIcon`, `RibbonDoubleIcon`
`RibbonFilledIcon`, `RibbonIcon`, `RIcon`, `RoadmapIcon`
`RocketIcon`, `RoundPinIcon`, `RubyIcon`, `RulerTriangleIcon`
`SavingBankIcon`, `SearchIcon`, `SendIcon`, `SettingsSliderVerticalIcon`
`ShareAltIcon`, `ShareIcon`, `SlackIcon`, `SmallCheckIcon`
`SmileyHappyIcon`, `SmileyIndifferentIcon`, `SmileySadIcon`, `SmileyStarEyesIcon`
`SparkleIcon`, `SparkleOutlineIcon`, `SpotifyIcon`, `SqlIcon`
`StackedSquaresIcon`, `StarCircleIcon`, `StarFilledCircleIcon`, `StarFilledIcon`
`StarIcon`, `StopSignIcon`, `StreakIcon`, `StudyBookIcon`
`SupportFilledIcon`, `SupportIcon`, `SwiftIcon`, `SymbolEqualIcon`
`SynchronizeRefreshArrowIcon`, `TagIcon`, `TaskListMultipleIcon`, `TeamIcon`
`TerminalIcon`, `ThumbsDownFilledIcon`, `ThumbsDownIcon`, `ThumbsUpFilledIcon`
`ThumbsUpIcon`, `TikTokIcon`, `Timer10Icon`, `TrackIcon`
`TranslateIcon`, `TrashIcon`, `TrophyFilledIcon`, `TrophyIcon`
`TwitterIcon`, `TwitterOutlineIcon`, `TypeIcon`, `TypescriptIcon`
`UndoIcon`, `UnlockHeavyIcon`, `UnlockIcon`, `UploadIcon`
`VideoPlayerMovieIcon`, `ViewIcon`, `ViewOffIcon`, `VisaIcon`
`VolumeControlFullIcon`, `VolumeControlMediumIcon`, `VolumeControlMuteIcon`, `WebDesignIcon`
`WebDevelopmentIcon`, `WebFormProgressIcon`, `WhatsAppFilledIcon`, `XIcon`
`YoutubeIcon`, `YoutubePlayIcon`, `ZoomIcon`

## Mini (36)

`MiniAccessibilityIcon`, `MiniAddIcon`, `MiniArrowDownIcon`, `MiniArrowLeftIcon`
`MiniArrowRightIcon`, `MiniArrowUpIcon`, `MiniAudioDescriptionIcon`, `MiniCalendarIcon`
`MiniCheckCircleIcon`, `MiniChevronDownIcon`, `MiniChevronLeftIcon`, `MiniChevronRightIcon`
`MiniChevronUpIcon`, `MiniCircleIcon`, `MiniCloseCaptioningIcon`, `MiniCopyIcon`
`MiniCursorIcon`, `MiniDeleteIcon`, `MiniEditIcon`, `MiniInfoCircleIcon`
`MiniInfoOutlineIcon`, `MiniKebabMenuIcon`, `MiniLiveVideoIcon`, `MiniOpenIcon`
`MiniPinIcon`, `MiniQuoteIcon`, `MiniRemoveCircleIcon`, `MiniReorderDotsVerticalIcon`
`MiniReplyToMessageIcon`, `MiniRibbonIcon`, `MiniSmileyAddReactionIcon`, `MiniStarIcon`
`MiniThumbsDownIcon`, `MiniThumbsUpIcon`, `MiniUndoIcon`, `MiniWarningTriangleIcon`
