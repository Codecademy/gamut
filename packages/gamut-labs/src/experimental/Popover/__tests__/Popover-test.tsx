import React from 'react';
import { render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import { Popover, PopoverProps } from '..';

const targetRefObj = {
  current: {
    getBoundingClientRect: () => {
      return {
        bottom: 298,
        height: 38,
        left: 57,
        right: 840,
        top: 260,
        width: 783,
        x: 57,
        y: 260,
        toJSON: () => {},
      };
    },
  },
};

const renderPopover = (props?: Partial<PopoverProps>) => {
  return render(
    <Popover isOpen={true} targetRef={targetRefObj} {...props}>
      <div data-testid={'popover-content'}>
        Howdy!
        <button type="button" />
      </div>
    </Popover>
  );
};

const mountPopover = (props?: Partial<PopoverProps>) => {
  return mount(
    <Popover isOpen={true} targetRef={targetRefObj} {...props}>
      <div data-testid={'popover-content'}>
        Howdy!
        <button type="button" />
      </div>
    </Popover>
  );
};

const popoverIsRendered = () => {
  return Boolean(screen.queryByTestId('popover-content'));
};

describe('Popover', () => {
  it('renders null when isOpen is not true', () => {
    renderPopover({ isOpen: false });

    expect(popoverIsRendered()).toBeFalsy();
  });

  it('renders children when isOpen is true', () => {
    renderPopover({ isOpen: true });
    expect(popoverIsRendered()).toBeTruthy();
  });

  it('does not show a beak if the prop is false', () => {
    renderPopover({
      isOpen: true,
      showBeak: false,
    });

    expect(screen.queryByTestId('popover-beak')).not.toBeInTheDocument();
  });

  it('shows a beak if the prop is true', () => {
    renderPopover({
      isOpen: true,
      showBeak: true,
    });

    expect(screen.queryByTestId('popover-beak')).toBeInTheDocument();
  });

  it("positions with default 'below', 'left', '20' value when position, align, offset props are not provided respectively", () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const wrapped = mountPopover({
      isOpen: true,
    });

    expect(
      wrapped.find('[data-testid="popover-content-container"]').props()
    ).toMatchObject({
      style: {
        top: 319,
        left: 58,
      },
    });
  });

  it('positions with given position and align values when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const wrapped = mountPopover({
      isOpen: true,
      position: 'above',
      align: 'right',
    });

    expect(
      wrapped.find('[data-testid="popover-content-container"]').props()
    ).toMatchObject({
      style: {
        top: 241,
        left: 841,
      },
    });
  });

  it('positions with given offset value when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 1 });
    Object.defineProperty(window, 'scrollX', { value: 1 });

    const wrapped = mountPopover({
      isOpen: true,
      position: 'above',
      align: 'right',
      offset: 30,
    });

    expect(
      wrapped.find('[data-testid="popover-content-container"]').props()
    ).toMatchObject({
      style: {
        top: 231,
        left: 841,
      },
    });
  });

  it('positions round to whole number when ', () => {
    Object.defineProperty(window, 'scrollY', { value: 1.5 });
    Object.defineProperty(window, 'scrollX', { value: 1.5 });

    const wrapped = mountPopover({
      isOpen: true,
      position: 'above',
      align: 'right',
      offset: 30,
    });

    expect(
      wrapped.find('[data-testid="popover-content-container"]').props()
    ).toMatchObject({
      style: {
        top: 232,
        left: 842,
      },
    });
  });
});
