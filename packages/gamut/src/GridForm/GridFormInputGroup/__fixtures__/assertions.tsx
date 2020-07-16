import { getComponent } from './renderers';

export const itHandlesRequiredProps = (
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
  const requiredTrue = { validation: { required: true } };
  const component = getComponent(componentName, requiredTrue);
  expect(component.find(selector).props()).toHaveProperty('aria-invalid');
};

const isMarkedAriaInvalidIfErrorExists = (
  componentName: string,
  selector: string
): void => {
  const requiredMessage = {
    validation: { required: 'Required' },
    error: true,
  };
  const component = getComponent(componentName, requiredMessage);

  expect(component.find(selector).props()['aria-invalid']).toBeTruthy();
};
