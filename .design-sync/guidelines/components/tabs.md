# Tabs

`Tabs` is a **composite** — not a single component with a `tabs` prop array. Compose it from `TabList`/`Tab` (the clickable tabs) and `TabPanels`/`TabPanel` (the content), matched by a shared `id`.

## Basic usage (uncontrolled)

```jsx
const { Tabs, TabList, Tab, TabPanels, TabPanel, Text } =
  window.CodecademyGamut;

<Tabs defaultSelectedKey="1">
  <TabList>
    <Tab id="1">Tab 1</Tab>
    <Tab id="2">Tab 2</Tab>
    <Tab id="3">Tab 3</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="1">
      <Text as="h2">Welcome to Tab 1</Text>
      <Text>Contents inside Tab 1.</Text>
    </TabPanel>
    <TabPanel id="2">
      <Text as="h2">Welcome to Tab 2</Text>
      <Text>Contents inside Tab 2.</Text>
    </TabPanel>
    <TabPanel id="3">
      <Text as="h2">Welcome to Tab 3</Text>
      <Text>Contents inside Tab 3.</Text>
    </TabPanel>
  </TabPanels>
</Tabs>;
```

## Controlled selection

```jsx
const [selected, setSelected] = useState('1');

<Tabs selectedKey={selected} onSelectionChange={setSelected}>
  {/* TabList / TabPanels as above */}
</Tabs>;
```

## Disabled tabs

Pass `disabledKeys={['2']}` on `Tabs` — the tab shows as present but cannot be selected, focused, or interacted with.

## Nav-style tabs (link-based, not panel-switching)

For tabs that navigate between routes/pages rather than switching in-page panels, use `TabNav` + `TabNavLink` instead of `Tab`/`TabPanel` — same visual treatment, but each item is a real link.

## When to use / not use

See `components/index.md` — `Tabs` is for _switching_ between content groups in one surface; use plain stacked sections when the content genuinely needs to be compared side-by-side without clicking. `guidelines/recipes/tabbed-sections.md` has a full composed example.
