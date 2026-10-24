# Recipe: grouping related content into switchable sections

The pattern that gets rebuilt as stacked, separately-scrolled sections: two
or more groups of related content where a user looks at one group at a
time (e.g. "In progress" / "Required" / "Completed"). Use `Tabs` — not
separate stacked sections requiring scroll to compare.

`Tabs` is a composite — compose it from `TabList`/`Tab` (the clickable tabs) and `TabPanels`/`TabPanel` (the content), matched by `id`:

```jsx
const { Tabs, TabList, Tab, TabPanels, TabPanel } = window.CodecademyGamut;

const TrainingSections = ({ inProgress, required, completed }) => (
  <Tabs defaultSelectedKey="in-progress">
    <TabList>
      <Tab id="in-progress">In Progress</Tab>
      <Tab id="required">Required</Tab>
      <Tab id="completed">Completed</Tab>
    </TabList>
    <TabPanels>
      <TabPanel id="in-progress">
        <TrainingList items={inProgress} />
      </TabPanel>
      <TabPanel id="required">
        <TrainingList items={required} />
      </TabPanel>
      <TabPanel id="completed">
        <TrainingList items={completed} />
      </TabPanel>
    </TabPanels>
  </Tabs>
);
```

For controlled selection, pass `selectedKey` + `onSelectionChange` instead of `defaultSelectedKey`.

## Why this, not stacked sections

- One control surface instead of three separately-headed sections — less scrolling, and the grouping itself communicates that these are alternate views of the same data, not three unrelated page sections.
- Standard tab keyboard navigation (arrow keys between tabs, Tab moves into the active panel) comes for free — a stacked-sections layout has no equivalent interaction to reimplement correctly.
- If the sections need to all be visible/scannable at once (not switched between), stacked sections are actually correct — `Tabs` is for _switching_, not just _grouping_. Don't reach for `Tabs` if the user genuinely needs to compare across groups without clicking.

## Combine with the data-list recipe

Each tab's `content` is commonly a `DataList` from `recipes/data-list-with-status.md` — the two recipes compose directly, as in the example above (`<TrainingList items={...} />` would itself be the `DataList` + `Badge` pattern from that recipe).
