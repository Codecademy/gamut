import { getComponent } from './renderers';

export const itHandlesAriaInvalid = (
  componentName: string,
  selector: string
): void => {
  describe('fields', () => {
    it('have the property aria-invalid', () => {
      hasAriaInvalidProperty(componentName, selector);
    });
    it('marks a field as aria-invalid when a field has an error', () => {
      isMarkedAriaInvalidIfErrorExists(componentName, selector);
    });
  });
};

const hasAriaInvalidProperty = (
  componentName: string,
  selector: string
): void => {
  const props = { validation: { required: true } };
  const component = getComponent(componentName, props);
  expect(component.find(selector).props()).toHaveProperty('aria-invalid');
  expect(component.find(selector).props()['aria-invalid']).toBeUndefined();
};

const isMarkedAriaInvalidIfErrorExists = (
  componentName: string,
  selector: string
): void => {
  const props = {
    validation: { required: 'Required' },
    error: true,
  };
  const component = getComponent(componentName, props);
  expect(component.find(selector).props()['aria-invalid']).toBeTruthy();
};
