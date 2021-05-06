import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { Alert } from '../Alert';

const StyledAlert = styled(Alert)`
  position: fixed;
  width: 100vw;
`;

export type ErrorLoudlyInDevOnlyProps = {
  displayMessage: string;
  logError: (rawError: Error) => void;
};

/**
 * The intention of this component is for when you want something to error LOUDLY in dev,
 * ie: throw an error in console and pop an alert on the page, but to not even throw, and
 * only log the error in prod to maintain the user experience.
 */
export const ErrorLoudlyInDevOnly: React.FC<ErrorLoudlyInDevOnlyProps> = ({
  displayMessage,
  logError,
}) => {
  useEffect(() => {
    const error = new Error(displayMessage);
    if (process.env.NODE_ENV !== 'test') logError(error);
    else throw error;
  }, []);

  return process.env.NODE_ENV === 'test' ? (
    <StyledAlert type="error" placement="floating">
      {displayMessage}
    </StyledAlert>
  ) : null;
};
