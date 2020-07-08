import { getComponent } from './renderers';

export const itHandlesRequiredProps = (
  componentName: string,
  selector: string
): void => {
  describe('required fields', () => {
    it('marks a field as required when a required validation boolean is passed', () => {
      isMarkedRequiredWithBoolean(componentName, selector);
    });
    it('marks a field as required when a required message is passed', () => {
      isMarkedRequiredWithMessage(componentName, selector);
    });
    it('does __not__ mark a field as required when `required: false` is passed', () => {
      isMarkedNotRequiredWithBoolean(componentName, selector);
    });
    it('does __not__ mark a field as required when required is not passed', () => {
      isMarkedNotRequiredWhenNotPassedRequiredProp(componentName, selector);
    });
  });
};

const isMarkedRequiredWithBoolean = (
  componentName: string,
  selector: string
): void => {
  const requiredTrue = { validation: { required: true } };
  const component = getComponent(componentName, requiredTrue);

  expect(component.find(selector).props().required).toBeTruthy();
};

const isMarkedRequiredWithMessage = (
  componentName: string,
  selector: string
): void => {
  const requiredMessage = { validation: { required: 'Required' } };
  const component = getComponent(componentName, requiredMessage);

  expect(component.find(selector).props().required).toBeTruthy();
};

const isMarkedNotRequiredWithBoolean = (
  componentName: string,
  selector: string
): void => {
  const requiredFalse = { validation: { required: false } };
  const component = getComponent(componentName, requiredFalse);

  expect(component.find(selector).props().required).toBeFalsy();
};

const isMarkedNotRequiredWhenNotPassedRequiredProp = (
  componentName: string,
  selector: string
): void => {
  const component = getComponent(componentName, {});

  expect(component.find(selector).props().required).toBeFalsy();
};
