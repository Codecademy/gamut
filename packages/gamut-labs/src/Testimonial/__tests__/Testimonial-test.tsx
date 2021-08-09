import { setupRtl } from '../../../../gamut-tests/dist';
import { Testimonial, TestimonialProps } from '..';

describe('Testimonial', () => {
  const defaultProps: TestimonialProps = {
    firstName: 'Christopher',
    lastName: 'Moltisanti',
    imageUrl: 'okthen',
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
});
