import { setupRtl } from '@codecademy/gamut-tests';

import { ErrorWithAlertInDev } from '..';

const logError = jest.fn();
const displayMessage = 'Sup, son?';
const renderView = setupRtl(ErrorWithAlertInDev, {
  logError,
  displayMessage,
});

describe('ErrorWithAlertInDev', () => {
  beforeEach(jest.clearAllMocks);

  const OLD_ENV = process.env;
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('renders nothing in prod', () => {
    process.env.NODE_ENV = 'production';

    expect(renderView().view.queryByText(displayMessage)).toBeNull();
  });

  it('renders an alert in dev', () => {
    process.env.NODE_ENV = 'development';

    renderView().view.getByText(displayMessage);
  });

  it('logs the error on mount', () => {
    renderView();

    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(displayMessage);
  });
});
