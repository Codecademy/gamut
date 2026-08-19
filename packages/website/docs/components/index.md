---
sidebar_position: 1
---

# Components

Gamut's components are grouped by what they _do_, not by Atomic Design tier
(atom / molecule / organism). You don't need to know how Gamut classifies a
component internally to find it — arrive with a need ("I have to tell the
user something went wrong") and the category matches it.

| Category                                  | Covers                                                                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Actions](./actions/index.md)             | Button, CTAButton, FillButton, StrokeButton, TextButton, IconButton, Menu, Tag                                          |
| [Containers](./containers/index.md)       | Box, FlexBox, GridBox, Card, ContentContainer, LayoutGrid, Disclosure, Drawer                                           |
| [Inputs & forms](./inputs-forms/index.md) | Input, TextArea, Checkbox, Radio, Toggle, Select, SelectDropdown, DatePicker, Form scaffolding, ConnectedForm, GridForm |
| [Navigation](./navigation/index.md)       | Anchor, Breadcrumbs, Pagination, Tabs, SkipToContent                                                                    |
| [Feedback](./feedback/index.md)           | Alert, Toast, Toaster, Coachmark, Tips (ToolTip, InfoTip, PreviewTip)                                                   |
| [Status](./status/index.md)               | Badge, ProgressBar, RadialProgress, Loaders (Spinner, Shimmer), FeatureShimmer                                          |
| [Overlays](./overlays/index.md)           | Modal, Dialog, Overlay, Popover, PopoverContainer, Flyout                                                               |
| [Data display](./data-display/index.md)   | DataTable, DataList, List, BarChart, Markdown                                                                           |
| [Typography](./typography/index.md)       | Text                                                                                                                    |
| [Media & assets](./media-assets/index.md) | Icons, Illustrations, Patterns, Animations, Video                                                                       |
| [Utilities](./utilities/index.md)         | FocusTrap, DelayedRenderWrapper                                                                                         |

## Ambiguous placements

A few components could reasonably live in more than one category. These
rulings are fixed; the losing category's landing page cross-links back:

| Component | Lives in   | Why                                                                                                           |
| --------- | ---------- | ------------------------------------------------------------------------------------------------------------- |
| Menu      | Actions    | The action-list role is the richer half of its API; the nav role is cross-linked from Navigation              |
| Tag       | Actions    | Docs emphasize interactive selection/removal; read-only overlap with Badge is arbitrated by "When NOT to use" |
| Tips      | Feedback   | Readers think "the system explaining something"; Overlays is reserved for things you open and dismiss         |
| Drawer    | Containers | Collapses within page flow, unlike Flyout which floats above it (Overlays)                                    |
| Anchor    | Navigation | Functionally navigation despite its typography implementation                                                 |

## Reading a component page

Every component page follows one template — see
[Using this site](../getting-started/using-this-site.md) for the section
order every page shares.

:::note Migration status
This site is still being populated. `Alert` (under Feedback) is fully
migrated to the new template as a worked example; other component pages
are listed by name on their category's landing page pending migration.
:::
