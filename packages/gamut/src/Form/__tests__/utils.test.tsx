import { parseOptions, parseSelectOptions } from '../utils';

describe(parseSelectOptions, () => {
  it('creates an option list from object map', () => {
    const options = parseSelectOptions({
      id: 'test',
      options: { val: 'Value', val2: 'Value 2' },
    });

    expect(options).toHaveLength(2);
    expect(options[0].type).toBe('option');
    expect(options[0].props).toMatchObject({
      'data-testid': 'test-val',
      label: 'Value',
      value: 'val',
    });
    expect(options[0].props.children).toBe('Value');
    expect(options[1].type).toBe('option');
    expect(options[1].props).toMatchObject({
      'data-testid': 'test-val2',
      label: 'Value 2',
      value: 'val2',
    });
    expect(options[1].props.children).toBe('Value 2');
  });

  it('creates an option list from string array', () => {
    const options = parseSelectOptions({
      id: 'test',
      options: ['val', 'val2'],
    });

    expect(options).toHaveLength(2);
    expect(options[0].type).toBe('option');
    expect(options[0].props).toMatchObject({
      'data-testid': 'test-val',
      label: 'val',
      value: 'val',
    });
    expect(options[0].props.children).toBe('val');
    expect(options[1].type).toBe('option');
    expect(options[1].props).toMatchObject({
      'data-testid': 'test-val2',
      label: 'val2',
      value: 'val2',
    });
    expect(options[1].props.children).toBe('val2');
  });
  it('creates an option list as object', () => {
    const options = parseOptions({
      id: 'test',
      options: { val: 'Value', val2: 'Value 2' },
    });

    expect(options).toHaveLength(2);
    expect(options[0]).toMatchObject({ key: 'test-val', label: 'Value', value: 'val' });
    expect(options[1]).toMatchObject({ key: 'test-val2', label: 'Value 2', value: 'val2' });
  });

  it('creates an option list as object without generated labels', () => {
    const options = parseOptions({
      id: 'test',
      options: ['val', 'val2'],
    });

    expect(options).toHaveLength(2);
    expect(options[0]).toMatchObject({ label: 'val', value: 'val' });
    expect(options[1]).toMatchObject({ label: 'val2', value: 'val2' });
  });
});
