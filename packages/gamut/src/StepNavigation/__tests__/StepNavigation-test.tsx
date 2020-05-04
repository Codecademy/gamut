import React from 'react';
import { mount } from 'enzyme';
import StepNavigation from '../index';

describe('StepNavigation', () => {
  const noOp = () => {};
  const steps = ['StepOne', 'StepTwo', 'StepThree'];

  const renderComponent = (currentStep: string, onStepClick = noOp) => {
    return mount(
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepClick}
      />
    );
  };

  it('displays the name of each step', () => {
    const wrapper = renderComponent('StepOne');

    expect(wrapper.find(`[data-testid='stepone-nav']`)).toIncludeText(
      'StepOne'
    );
    expect(wrapper.find(`[data-testid='steptwo-nav']`)).toIncludeText(
      'StepTwo'
    );
    expect(wrapper.find(`[data-testid='stepthree-nav']`)).toIncludeText(
      'StepThree'
    );
  });

  it('applies a current class only to the second step', () => {
    const wrapper = renderComponent('StepTwo');

    expect(wrapper.find(`[data-testid='stepone-nav']`)).toHaveClassName(
      'visited'
    );
    expect(wrapper.find(`[data-testid='steptwo-nav']`)).toHaveClassName(
      'current'
    );
    expect(wrapper.find(`[data-testid='stepthree-nav']`)).toHaveClassName(
      'remaining'
    );
  });

  it('applies a current class only to the first step', () => {
    const wrapper = renderComponent('StepOne');

    expect(wrapper.find(`[data-testid='stepone-nav']`)).toHaveClassName(
      'current'
    );
    expect(wrapper.find(`[data-testid='steptwo-nav']`)).toHaveClassName(
      'remaining'
    );
    expect(wrapper.find(`[data-testid='stepthree-nav']`)).toHaveClassName(
      'remaining'
    );
  });

  it('applies visited class to previous steps', () => {
    const wrapper = renderComponent('StepThree');

    expect(wrapper.find(`[data-testid='stepone-nav']`)).toHaveClassName(
      'visited'
    );
    expect(wrapper.find(`[data-testid='steptwo-nav']`)).toHaveClassName(
      'visited'
    );
    expect(wrapper.find(`[data-testid='stepthree-nav']`)).toHaveClassName(
      'current'
    );
  });

  it('passes clicked step to callback', () => {
    const stepClickSpy = jest.fn();

    const wrapper = renderComponent('StepTwo', stepClickSpy);

    wrapper.find(`[data-testid='stepone-nav']`).simulate('click');

    expect(stepClickSpy).toHaveBeenCalledWith('StepOne');
  });

  it('does NOT allow clicking on a remaining link', () => {
    const stepClickSpy = jest.fn();

    const wrapper = renderComponent('StepOne', stepClickSpy);

    wrapper.find(`[data-testid='steptwo-nav']`).simulate('click');

    expect(stepClickSpy).not.toHaveBeenCalled();
  });

  it('does NOT allow clicking on a current link', () => {
    const stepClickSpy = jest.fn();

    const wrapper = renderComponent('StepOne', stepClickSpy);

    wrapper.find(`[data-testid='stepone-nav']`).simulate('click');

    expect(stepClickSpy).not.toHaveBeenCalled();
  });
});
