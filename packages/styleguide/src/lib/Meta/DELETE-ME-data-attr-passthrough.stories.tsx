/*
 * TEMPORARY - DELETE BEFORE MERGE.
 *
 * Manual test surface for the `data-` / `aria-` attribute passthrough work (GMT-30, PR #3430).
 * There is no visual change anywhere in that PR, so this story exists purely to
 * let a tester confirm attributes land on the right DOM node without digging
 * through devtools. Every case below renders a component with a probe
 * attribute, then the readout re-queries the DOM and reports which element the
 * attribute actually landed on.
 *
 * This file is not part of the shipped design system and must be removed before
 * this PR merges.
 */
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Dialog,
  Disclosure,
  FillButton,
  FlexBox,
  Flyout,
  InfoTip,
  List,
  ListCol,
  ListRow,
  Modal,
  Pagination,
  ProgressBar,
  Radio,
  SelectDropdown,
  Tag,
  Text,
  Toast,
  Toggle,
  ToolTip,
} from '@codecademy/gamut';
import { DataTable } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

type Expectation = {
  /** value of the probe attribute rendered below */
  marker: string;
  /** what a tester is checking */
  label: string;
  /** tag name (optionally `tag[role]`) the attribute should land on */
  expected: string;
  /** for DataTable/List: the marked node must contain these descendants */
  contains?: string[];
};

const expectations: Expectation[] = [
  { marker: 'probe-progressbar', label: 'ProgressBar → root', expected: 'div' },
  { marker: 'probe-toast', label: 'Toast → container', expected: 'div' },
  { marker: 'probe-breadcrumbs', label: 'Breadcrumbs → nav', expected: 'nav' },
  { marker: 'probe-pagination', label: 'Pagination → root', expected: 'div' },
  {
    marker: 'probe-disclosure',
    label: 'Disclosure → wrapper',
    expected: 'div',
  },
  {
    marker: 'probe-datatable',
    label: 'DataTable → outer wrapper (must contain the header row)',
    expected: 'div',
    contains: ['thead', 'tbody'],
  },
  {
    marker: 'probe-list',
    label: 'List → outer wrapper',
    expected: 'div',
    contains: ['ul'],
  },
  {
    marker: 'probe-selectdropdown',
    label: 'SelectDropdown → container',
    expected: 'div',
  },
  { marker: 'probe-tooltip', label: 'ToolTip → wrapper', expected: 'div' },
  { marker: 'probe-infotip', label: 'InfoTip → wrapper', expected: 'div' },
  {
    marker: 'probe-disclosure-button',
    label: 'Disclosure buttonProps → toggle button',
    expected: 'button',
  },
  {
    marker: 'probe-infotip-button',
    label: 'InfoTip buttonProps → info button',
    expected: 'button',
  },
  {
    marker: 'probe-tag-anchor',
    label: 'Tag buttonProps → anchor (navigation variant)',
    expected: 'a',
  },
  {
    marker: 'probe-tag-dismiss',
    label: 'Tag dismissButtonProps → dismiss button (selection variant)',
    expected: 'button',
  },
  {
    marker: 'probe-checkbox-label',
    label: 'Checkbox labelProps → visible label',
    expected: 'label',
  },
  {
    marker: 'probe-radio-label',
    label: 'Radio labelProps → visible label',
    expected: 'label',
  },
  {
    marker: 'probe-toggle-input',
    label: 'Toggle inputProps → input (as="input")',
    expected: 'input',
  },
  {
    marker: 'probe-toggle-button',
    label: 'Toggle inputProps → button (as="button")',
    expected: 'button',
  },
  {
    marker: 'probe-modal',
    label: 'Modal → the role="dialog" node, not the shroud (open it first)',
    expected: 'div[dialog]',
  },
  {
    marker: 'probe-dialog',
    label: 'Dialog → the role="dialog" node (open it first)',
    expected: 'div[dialog]',
  },
  {
    marker: 'probe-flyout',
    label: 'Flyout → overlay container (open it first)',
    expected: 'div',
  },
];

const describeNode = (el: Element) => {
  const role = el.getAttribute('role');
  return `${el.tagName.toLowerCase()}${role ? `[${role}]` : ''}`;
};

type Result = Expectation & { found?: string; missing?: string[] };

const Readout: React.FC<{ nonce: number }> = ({ nonce }) => {
  const [results, setResults] = useState<Result[]>([]);

  const check = useCallback(() => {
    setResults(
      expectations.map((expectation) => {
        const el = document.querySelector(
          `[data-marker="${expectation.marker}"]`
        );
        if (!el) return expectation;
        const missing = (expectation.contains ?? []).filter(
          (selector) => !el.querySelector(selector)
        );
        return { ...expectation, found: describeNode(el), missing };
      })
    );
  }, []);

  // re-check whenever a tester opens an overlay, since those mount on demand
  useEffect(() => {
    const timeout = setTimeout(check, 50);
    return () => clearTimeout(timeout);
  }, [check, nonce]);

  const passed = results.filter(
    (r) => r.found === r.expected && !r.missing?.length
  ).length;

  return (
    <Box bg="background-selected" mb={32} p={16}>
      <FlexBox alignItems="center" justifyContent="space-between" mb={8}>
        <Text fontWeight="title" variant="title-sm">
          {`Attribute placement: ${passed}/${results.length} as expected`}
        </Text>
        <FillButton size="small" onClick={check}>
          Re-check
        </FillButton>
      </FlexBox>
      <Text mb={16} variant="p-small">
        Overlay rows stay unresolved until you open the relevant overlay below,
        then hit Re-check.
      </Text>
      <List as="ul" spacing="condensed" variant="table">
        {results.map((result) => {
          const ok =
            result.found === result.expected && !result.missing?.length;
          const detail = !result.found
            ? 'not rendered yet'
            : ok
            ? `on <${result.found}>`
            : `on <${result.found}>, expected <${result.expected}>${
                result.missing?.length
                  ? `, missing ${result.missing.join(', ')}`
                  : ''
              }`;
          return (
            <ListRow key={result.marker}>
              <ListCol size="sm">
                <Text
                  fontWeight="title"
                  textColor={
                    ok
                      ? 'feedback-success'
                      : result.found
                      ? 'feedback-error'
                      : 'text-secondary'
                  }
                >
                  {ok ? 'PASS' : result.found ? 'FAIL' : '—'}
                </Text>
              </ListCol>
              <ListCol size="lg">
                <Text>{result.label}</Text>
              </ListCol>
              <ListCol size="md">
                <Text variant="p-small">{detail}</Text>
              </ListCol>
            </ListRow>
          );
        })}
      </List>
    </Box>
  );
};

const Section: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => (
  <Box mb={24}>
    <Text as="h3" mb={8} variant="title-xs">
      {title}
    </Text>
    <FlexBox alignItems="center" columnGap={24} flexWrap="wrap" rowGap={16}>
      {children}
    </FlexBox>
  </Box>
);

const probeColumns = [
  { key: 'name' as const, header: 'Name', size: 'md' as const },
];
const probeRows = [{ id: 'r1', name: 'row one' }];

const Harness: React.FC = () => {
  const [nonce, setNonce] = useState(0);
  const bump = () => setNonce((n) => n + 1);
  const [openOverlay, setOpenOverlay] = useState<
    'none' | 'modal' | 'dialog' | 'flyout'
  >('none');
  const [page, setPage] = useState(1);
  const [checked, setChecked] = useState(false);

  const close = () => {
    setOpenOverlay('none');
    bump();
  };
  const open = (which: 'modal' | 'dialog' | 'flyout') => {
    setOpenOverlay(which);
    bump();
  };

  return (
    <Box p={16}>
      <Readout nonce={nonce} />

      <Section title="Previously dropped entirely — attribute on the root">
        <Box width="12rem">
          <ProgressBar
            data-marker="probe-progressbar"
            percent={40}
            variant="blue"
          />
        </Box>
        <Toast data-marker="probe-toast" onClose={() => null}>
          Toast body
        </Toast>
        <Breadcrumbs
          crumbs={[{ title: 'One' }, { title: 'Two' }]}
          data-marker="probe-breadcrumbs"
        />
        <Pagination
          data-marker="probe-pagination"
          pageNumber={page}
          totalPages={5}
          onChange={setPage}
        />
        <Box width="20rem">
          <Disclosure
            body="Disclosure body"
            data-marker="probe-disclosure"
            heading="Disclosure heading"
          />
        </Box>
        <Box width="18rem">
          <SelectDropdown
            data-marker="probe-selectdropdown"
            name="probe-select"
            options={['one', 'two']}
          />
        </Box>
        <ToolTip data-marker="probe-tooltip" info="Tooltip text">
          <FillButton size="small">Hover me</FillButton>
        </ToolTip>
        <InfoTip
          ariaLabel="More info"
          data-marker="probe-infotip"
          info="Infotip text"
        />
      </Section>

      <Section title="List and DataTable — marker must contain the header row">
        <Box width="24rem">
          <DataTable
            columns={probeColumns}
            data-marker="probe-datatable"
            id="probe-table"
            idKey="id"
            rows={probeRows}
          />
        </Box>
        <Box width="14rem">
          <List data-marker="probe-list">
            <ListRow>
              <ListCol>List row</ListCol>
            </ListRow>
          </List>
        </Box>
      </Section>

      <Section title="Slot props — attribute on the inner interactive element">
        <Box width="20rem">
          <Disclosure
            body="Body"
            buttonProps={{ 'data-marker': 'probe-disclosure-button' }}
            heading="buttonProps → toggle button"
          />
        </Box>
        <InfoTip
          ariaLabel="More info"
          buttonProps={{ 'data-marker': 'probe-infotip-button' }}
          info="buttonProps → info button"
        />
        <Tag
          buttonProps={{ 'data-marker': 'probe-tag-anchor' }}
          href="#nowhere"
          variant="navigation"
        >
          navigation tag
        </Tag>
        <Tag
          dismissButtonProps={{ 'data-marker': 'probe-tag-dismiss' }}
          variant="selection"
          onDismiss={() => null}
        >
          selection tag
        </Tag>
        <Checkbox
          checked={checked}
          htmlFor="probe-checkbox"
          label="Checkbox labelProps"
          labelProps={{ 'data-marker': 'probe-checkbox-label' }}
          onChange={() => setChecked(!checked)}
        />
        <Radio
          htmlFor="probe-radio"
          label="Radio labelProps"
          labelProps={{ 'data-marker': 'probe-radio-label' }}
          name="probe-radio-group"
        />
        <Toggle
          ariaLabel="Toggle as input"
          checked={checked}
          inputProps={{ 'data-marker': 'probe-toggle-input' }}
          label="inputProps → input"
          onChange={() => setChecked(!checked)}
        />
        <Toggle
          ariaLabel="Toggle as button"
          as="button"
          checked={checked}
          inputProps={{ 'data-marker': 'probe-toggle-button' }}
          label="inputProps → button"
          onClick={() => setChecked(!checked)}
        />
      </Section>

      <Section title="Overlays — open one, then Re-check">
        <FillButton size="small" onClick={() => open('modal')}>
          Open Modal
        </FillButton>
        <FillButton size="small" onClick={() => open('dialog')}>
          Open Dialog
        </FillButton>
        <FillButton size="small" onClick={() => open('flyout')}>
          Open Flyout
        </FillButton>
      </Section>

      <Section title="aria-label — default preserved, consumer value wins">
        <Breadcrumbs crumbs={[{ title: 'Default label' }]} />
        <Breadcrumbs
          aria-label="my custom trail"
          crumbs={[{ title: 'Overridden label' }]}
        />
      </Section>

      <Modal
        data-marker="probe-modal"
        isOpen={openOverlay === 'modal'}
        title="Modal"
        onRequestClose={close}
      >
        Inspect this dialog node for data-marker=&quot;probe-modal&quot;.
      </Modal>
      <Dialog
        confirmCta={{ children: 'Confirm' }}
        data-marker="probe-dialog"
        isOpen={openOverlay === 'dialog'}
        title="Dialog"
        onRequestClose={close}
      >
        Inspect this dialog node for data-marker=&quot;probe-dialog&quot;.
      </Dialog>
      <Flyout
        closeLabel="Close flyout"
        data-marker="probe-flyout"
        expanded={openOverlay === 'flyout'}
        title="Flyout"
        onClose={close}
      >
        <Box p={16}>Flyout content</Box>
      </Flyout>
    </Box>
  );
};

const meta: Meta<typeof Harness> = {
  component: Harness,
  title: 'DELETE BEFORE MERGE/data-* passthrough (GMT-30)',
};

export default meta;
type Story = StoryObj<typeof Harness>;

export const AttributePlacement: Story = {};
