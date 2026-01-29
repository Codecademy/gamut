import { parseOptions, parseSelectOptions } from '../utils';

describe(parseSelectOptions, () => {
  it('creates an option list', () => {
    const options = parseSelectOptions({
      id: 'test',
      options: { val: 'Value', val2: 'Value 2' },
    });

    expect(options).toMatchSnapshot();
  });

  it('creates an option list', () => {
    const options = parseSelectOptions({
      id: 'test',
      options: ['val', 'val2'],
    });

    expect(options).toMatchSnapshot();
  });

  it('creates an option list as object', () => {
    const options = parseOptions({
      id: 'test',
      options: { val: 'Value', val2: 'Value 2' },
    });

    expect(options).toMatchSnapshot();
  });

  it('creates an option list as object without generated labels', () => {
    const options = parseOptions({
      id: 'test',
      options: ['val', 'val2'],
    });

    expect(options).toMatchSnapshot();
  });
});
