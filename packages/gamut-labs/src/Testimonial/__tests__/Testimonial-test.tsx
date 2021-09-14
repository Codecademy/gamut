import { setupRtl } from '@codecademy/gamut-tests';

import { Testimonial, TestimonialProps } from '..';

describe('Testimonial', () => {
  const defaultProps: TestimonialProps = {
    firstName: 'Christopher',
    lastName: 'Moltisanti',
    imageUrl: 'okthen',
    href: 'bloip',
    location: 'New Jersey',
    occupation: 'Waste Management',
    quote:
      "Like everybody starts out somewheres. and they do something, something gets done to them and it changes their life. That's called an arc. Where's my arc?",
  };
  const renderView = setupRtl(Testimonial, defaultProps);

  it('formats and renders the first and last name', () => {
    const { view } = renderView();
    view.getByText('Christopher M.');
  });

  describe('when the image url is defined', () => {
    it('displays testimonial photo', () => {
      const { view } = renderView();
      view.getByTestId('testimonial-photo');
    });
    describe('when hidePhoto is true', () => {
      it('does not display testimonial photo', () => {
        const { view } = renderView({ hidePhoto: true });
        expect(view.queryAllByTestId('testimonial-photo').length).toBe(0);
      });
    });
  });

  describe('when image url is undefined', () => {
    it('does not display testimonial photo', () => {
      const { view } = renderView({ imageUrl: undefined });
      expect(view.queryAllByTestId('testimonial-photo').length).toBe(0);
    });
  });

  describe('when href is undefined', () => {
    it('does not render an anchor tag', () => {
      const { view } = renderView({ href: undefined });
      expect(view.queryAllByTestId('testimonial-link').length).toBeFalsy();
    });
  });

  describe('when href is defined', () => {
    it('renders the card inside of an anchor tag', () => {
      const { view } = renderView();
      expect(view.getByTestId('testimonial-link')).toHaveAttribute(
        'href',
        defaultProps.href
      );
    });

    describe('and display is none', () => {
      it('does not render anchor tag', () => {
        const { view } = renderView({ display: 'none' });
        expect(view.queryByTestId('testimonial-link')).not.toBeVisible();
      });
    });
  });

  describe('when  company is undefined', () => {
    it('does not render company formatting text', () => {
      const { view } = renderView();
      expect(view.queryAllByText('@', { exact: false }).length).toBeFalsy();
    });
  });

  describe('when company is defined', () => {
    it('renders formatted company text', () => {
      const company = 'Satriolies';
      const { view } = renderView({ company });

      expect(view.getAllByText(`@ ${company}`, { exact: false }).length).toBe(
        1
      );
    });
  });
});
