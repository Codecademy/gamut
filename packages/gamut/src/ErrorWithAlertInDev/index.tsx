import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { Alert } from '../Alert';

const StyledAlertContainer = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledAlert = styled(Alert)`
  position: fixed;
  width: 100vw;
  top: 0;
`;

export type ErrorWithAlertInDevProps = {
  displayMessage: string;
  logError: (rawError: Error | Error['message']) => void;
};

/**
 * The intention of this component is for when you want something to error LOUDLY in dev,
 * ie: throw an error in console and pop an alert on the page, but to not even throw, and
 * only log the error in prod to maintain the user experience.
 */
export const ErrorWithAlertInDev: React.FC<ErrorWithAlertInDevProps> = ({
  displayMessage,
  logError,
}) => {
  useEffect(() => {
    logError(displayMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return process.env.NODE_ENV === 'development' ? (
    <StyledAlertContainer>
      <StyledAlert type="error" placement="inline">
        {displayMessage}
      </StyledAlert>
    </StyledAlertContainer>
  ) : null;
};
