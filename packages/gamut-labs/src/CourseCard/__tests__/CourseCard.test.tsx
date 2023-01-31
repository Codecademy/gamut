import { setupRtl } from '@codecademy/gamut-tests';

import { CourseCard } from '..';
import { mockFreeCourseContent, mockProCourseContent } from './__fixtures__';

const renderView = setupRtl(CourseCard);

describe('CourseCard', () => {
  describe('When the course is free', () => {
    it('renders Free course in header', () => {
      const { view } = renderView(mockFreeCourseContent);
      view.getByText('Free course');
    });

    it('does not show certificate copy', () => {
      const { view } = renderView(mockFreeCourseContent);
      expect(view.queryByText('Certificate')).toBeFalsy();
    });

    it('does not show certificate even if course can grant certificate', () => {
      const { view } = renderView({
        ...mockFreeCourseContent,
        grantsCertificate: true,
      });
      expect(view.queryByText('Certificate')).toBeFalsy();
    });
  });

  describe('When the course is pro', () => {
    it('renders just Course in header', () => {
      const { view } = renderView(mockProCourseContent);
      view.getByText('Course');
    });

    it('renders certificate when the course grants a certificate', () => {
      const { view } = renderView(mockProCourseContent);
      view.getByText('Certificate');
    });

    it('does not render certificate when the course does not grant a certificate', () => {
      const { view } = renderView({
        ...mockProCourseContent,
        grantsCertificate: false,
      });
      expect(view.queryByText('Certificate')).toBeFalsy();
    });
  });
});
