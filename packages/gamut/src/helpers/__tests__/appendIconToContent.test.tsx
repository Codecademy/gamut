import { MiniWarningTriangleIcon, StarIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { AppendedIconProps, appendIconToContent } from '../appendIconToContent';

const TestAppendIconToContent = (props: AppendedIconProps) => (
  <div data-testid="wrapper">{appendIconToContent(props)}</div>
);

const renderView = setupRtl(TestAppendIconToContent, {
  children: <div>Test content</div>,
  icon: StarIcon,
});

const renderMultiView = setupRtl(TestAppendIconToContent, {
  children: <div>Test content</div>,
  icon: [StarIcon, MiniWarningTriangleIcon],
});

describe('appendIconToContent', () => {
  describe('when no icon is provided', () => {
    it('returns only children', () => {
      const { view } = renderView({ icon: undefined });

      expect(view.getByText('Test content')).toBeInTheDocument();
      expect(
        screen.queryByRole('img', { hidden: true })
      ).not.toBeInTheDocument();
    });
  });

  describe('when icon is provided', () => {
    it('renders icon in the left position', () => {
      const { view } = renderView({ iconPosition: 'left' });

      const wrapper = view.getByTestId('wrapper');
      const icon = screen.getByRole('img', { hidden: true });
      const textNode = view.getByText('Test content');

      expect(textNode).toBeInTheDocument();
      expect(icon).toBeInTheDocument();

      // Check that icon appears before text in DOM order
      const allNodes = Array.from(wrapper.firstElementChild?.children || []);
      const iconIndex = allNodes.indexOf(icon);
      const textIndex = allNodes.findIndex((node) =>
        node.textContent?.includes('Test content')
      );

      expect(iconIndex).toBeLessThan(textIndex);
    });

    it('renders icon in the right position', () => {
      const { view } = renderView({ iconPosition: 'right' });

      const wrapper = view.getByTestId('wrapper');
      const icon = screen.getByRole('img', { hidden: true });
      const textNode = view.getByText('Test content');

      expect(textNode).toBeInTheDocument();
      expect(icon).toBeInTheDocument();

      // Check that icon appears after text in DOM order
      const allNodes = Array.from(wrapper.firstElementChild?.children || []);
      const iconIndex = allNodes.indexOf(icon);
      const textIndex = allNodes.findIndex((node) =>
        node.textContent?.includes('Test content')
      );

      expect(iconIndex).toBeGreaterThan(textIndex);
    });

    it('applies custom icon size', () => {
      renderView({ iconSize: 24 });

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveStyle({ width: '24px' });
    });

    it('applies default icon size when not specified', () => {
      renderView();

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveStyle({ width: '12px' });
    });

    it('applies custom icon and text gap', () => {
      renderView({
        iconAndTextGap: 16,
        iconPosition: 'left',
      });

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveStyle({ 'margin-right': '1rem' });
    });
  });

  describe('icon positioning', () => {
    it('applies correct spacing props for left position', () => {
      renderView({
        iconPosition: 'left',
        iconAndTextGap: 12,
      });

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveStyle({ 'margin-right': '0.75rem' });
    });

    it('applies correct spacing props for right position', () => {
      renderView({
        iconPosition: 'right',
        iconAndTextGap: 16,
      });

      const icon = screen.getByRole('img', { hidden: true });
      expect(icon).toHaveStyle({ 'margin-left': '1rem' });
    });
  });

  describe('layout modes', () => {
    it('renders inline layout when isInlineIcon is true', () => {
      const { view } = renderView({ isInlineIcon: true });

      const wrapper = view.getByTestId('wrapper');
      const layoutWrapper = wrapper.firstElementChild;

      expect(view.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

      expect(layoutWrapper).toHaveStyle({ display: 'inline' });
    });

    it('renders flex layout when isInlineIcon is false', () => {
      const { view } = renderView({ isInlineIcon: false });

      const wrapper = view.getByTestId('wrapper');
      const layoutWrapper = wrapper.firstElementChild;

      expect(view.getByText('Test content')).toBeInTheDocument();
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

      expect(layoutWrapper).toHaveStyle({ display: 'flex' });
    });
  });

  describe('when icons array is provided', () => {
    it('renders both icons with children in between', () => {
      const { view } = renderMultiView();

      const wrapper = view.getByTestId('wrapper');
      const icons = screen.getAllByRole('img', { hidden: true });
      const textNode = view.getByText('Test content');

      expect(textNode).toBeInTheDocument();
      expect(icons).toHaveLength(2);

      // Check that first icon appears before text and second icon appears after text in DOM order
      const allNodes = Array.from(wrapper.firstElementChild?.children || []);
      const firstIconIndex = allNodes.indexOf(icons[0]);
      const secondIconIndex = allNodes.indexOf(icons[1]);
      const textIndex = allNodes.findIndex((node) =>
        node.textContent?.includes('Test content')
      );

      expect(firstIconIndex).toBeLessThan(textIndex);
      expect(secondIconIndex).toBeGreaterThan(textIndex);
    });

    it('applies custom icon size to both icons', () => {
      renderMultiView({ iconSize: 20 });

      const icons = screen.getAllByRole('img', { hidden: true });
      expect(icons).toHaveLength(2);

      icons.forEach((icon) => {
        expect(icon).toHaveStyle({ width: '20px' });
      });
    });

    it('applies custom icon and text gap to both icons', () => {
      renderMultiView({ iconAndTextGap: 14 });

      const icons = screen.getAllByRole('img', { hidden: true });
      expect(icons).toHaveLength(2);

      // First icon should have right margin (left position)
      expect(icons[0]).toHaveStyle({ 'margin-right': '14px' });
      // Second icon should have left margin (right position)
      expect(icons[1]).toHaveStyle({ 'margin-left': '14px' });
    });
  });

  describe('layout modes for multi icons', () => {
    it('renders inline layout when isInlineIcon is true with multiple icons', () => {
      const { view } = renderMultiView({ isInlineIcon: true });

      const wrapper = view.getByTestId('wrapper');
      const layoutWrapper = wrapper.firstElementChild;

      expect(view.getByText('Test content')).toBeInTheDocument();
      expect(screen.getAllByRole('img', { hidden: true })).toHaveLength(2);

      expect(layoutWrapper).toHaveStyle({ display: 'inline' });
    });

    it('renders flex layout when isInlineIcon is false with multiple icons', () => {
      const { view } = renderMultiView({ isInlineIcon: false });

      const wrapper = view.getByTestId('wrapper');
      const layoutWrapper = wrapper.firstElementChild;

      expect(view.getByText('Test content')).toBeInTheDocument();
      expect(screen.getAllByRole('img', { hidden: true })).toHaveLength(2);

      expect(layoutWrapper).toHaveStyle({ display: 'flex' });
    });
  });
});
