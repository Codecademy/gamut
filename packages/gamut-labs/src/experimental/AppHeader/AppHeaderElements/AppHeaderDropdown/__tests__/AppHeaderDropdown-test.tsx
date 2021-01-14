import { render, screen } from '@testing-library/react';
import React from 'react';

import { AppHeaderDropdown, AppHeaderDropdownProps } from '..';

const testTargetText = 'Test Link';
const testDropdownTexts = ['Test SubLink 1 Text', 'Test Sublink 2 Text'];
const testDropdownUrls = ['test-sublink-url-1', 'test-sublink-url-2'];

const props: AppHeaderDropdownProps = {
  item: {
    dataTestId: '',
    id: 'target-link',
    text: testTargetText,
    popover: [
      {
        dataTestId: '',
        id: 'sublink-1',
        text: testDropdownTexts[0],
        href: testDropdownUrls[0],
        trackingTarget: '',
        type: 'link',
      },
      {
        dataTestId: '',
        id: 'sublink-2',
        text: testDropdownTexts[1],
        href: testDropdownUrls[1],
        trackingTarget: '',
        type: 'link',
      },
    ],
    trackingTarget: '',
    type: 'dropdown',
  },
  onClick: jest.fn(),
};

const renderAppHeaderDropdown = () => {
  return render(<AppHeaderDropdown {...props} />);
};

describe('AppHeaderDropdown', () => {
  it('displays target link text', () => {
    renderAppHeaderDropdown();
    expect(screen.getByText(testTargetText));
  });

  it('displays sublinks text upon expanding the dropdown', () => {
    renderAppHeaderDropdown();
    screen.getByRole('button').click();
    expect(screen.getByText(testDropdownTexts[0]));
    expect(screen.getByText(testDropdownTexts[1]));
  });

  it('sublinks link to the provided hrefs', () => {
    renderAppHeaderDropdown();
    screen.getByRole('button').click();
    expect(screen.getAllByRole('link')[0].getAttribute('href')).toEqual(
      testDropdownUrls[0]
    );
    expect(screen.getAllByRole('link')[1].getAttribute('href')).toEqual(
      testDropdownUrls[1]
    );
  });
});
