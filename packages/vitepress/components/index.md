# Components

Components are grouped by what they do, not by Gamut's internal Atomic Design tier — see `docs/adr/0001-documentation-site-information-architecture.md` §2 for the rationale and full placement rulings.

| Category                              | Components                                                                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Actions](./actions/)                 | Button, CTAButton, FillButton, StrokeButton, TextButton, IconButton, Menu, Tag                              |
| [Containers](./containers/)           | Box, FlexBox, GridBox, Card, ContentContainer, LayoutGrid, Disclosure, Drawer                               |
| [Inputs & forms](./inputs-and-forms/) | Input, TextArea, Checkbox, Radio, Toggle, Select, SelectDropdown, DatePicker, Form, ConnectedForm, GridForm |
| [Navigation](./navigation/)           | Anchor, Breadcrumbs, Pagination, Tabs, SkipToContent                                                        |
| [Feedback](./feedback/)               | Alert, Toast, Toaster, Coachmark, Tips (ToolTip, InfoTip, PreviewTip)                                       |
| [Status](./status/)                   | Badge, ProgressBar, RadialProgress, Loaders, FeatureShimmer                                                 |
| [Overlays](./overlays/)               | Modal, Dialog, Overlay, Popover, PopoverContainer, Flyout                                                   |
| [Data display](./data-display/)       | DataTable, DataList, List, BarChart, Markdown                                                               |
| [Typography](./typography/)           | Text                                                                                                        |
| [Media & assets](./media-and-assets/) | Icons, Illustrations, Patterns, Animations, Video                                                           |
| [Utilities](./utilities/)             | FocusTrap, DelayedRenderWrapper                                                                             |

Only **Actions → FillButton, StrokeButton, TextButton** are fully migrated so far; everything else is a stub landing page.
