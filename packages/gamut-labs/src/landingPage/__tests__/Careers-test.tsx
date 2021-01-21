import { render } from '@testing-library/react';
import React from 'react';

import { PageCareers } from '../PageCareers';

describe('PageCareers', () => {
  (global as any).fetch = jest.fn();

  afterEach(() => {
    (global as any).fetch.mockClear();
  });

  it('renders a spinner when the api call is in flight', async () => {
    (global as any).fetch.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1337);
      });
    });

    const wrapper = render(<PageCareers />);

    // we purposefully do not await getTestById as we want the mocked promise to be in flight
    expect(wrapper.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders a list of jobs by department when the api call succeeds', async () => {
    (global as any).fetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          jobs: [
            {
              id: 420,
              title: 'test',
              departments: [{ name: 'test-dept-1' }],
            },
            {
              id: 1337,
              title: 'test2',
              departments: [{ name: 'test-dept-2' }],
            },
          ],
        }),
    });

    const wrapper = render(<PageCareers />);

    expect(await wrapper.findAllByText(/^test-dept-*/)).toHaveLength(2);
  });

  it('renders an error when the api call fails', async () => {
    (global as any).fetch.mockImplementation(() =>
      Promise.reject(new Error('yikes'))
    );

    const wrapper = render(<PageCareers />);

    expect(
      await wrapper.findByText(
        'We had some trouble loading this content. Please refresh your browser or try again later.'
      )
    ).toBeInTheDocument();
  });
});
