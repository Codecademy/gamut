import { omitProps } from '../omitProps';

describe('omitProps', () => {
  it('omits values from props object when passed in as an array', () => {
    const props = {
      one: true,
      two: 'submit',
      three: {},
    };
    expect(omitProps(['one'], props)).toEqual({ two: 'submit', three: {} });
  });

  it('omits values from props object when passed in as an array', () => {
    const props = {
      one: true,
      two: 'submit',
      three: {},
    };

    const { one, ...otherProps } = props;

    expect(omitProps(otherProps, props)).toEqual({ one: true });
  });

  it('allows className and children prop to pass through', () => {
    const props = {
      one: true,
      two: 'submit',
      three: {},
      className: 'button',
      children: 'Submit',
    };

    expect(omitProps(props, props)).toEqual({
      className: 'button',
      children: 'Submit',
    });
  });

  it('allows data attributes to pass through', () => {
    const props = {
      one: true,
      two: 'button',
      'data-testid': 'submit',
      data: {},
      'not-a-data-attribute': 'cool',
      'Data-stuff': 'cool',
    };

    expect(omitProps(props, props)).toEqual({
      'data-testid': 'submit',
    });
  });
});
