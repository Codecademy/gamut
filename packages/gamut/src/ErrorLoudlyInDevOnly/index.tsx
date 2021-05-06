import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { Alert } from '../Alert';

const isEnvDev = process.env.NODE_ENV === 'development';

const StyledAlert = styled(Alert)`
  position: fixed;
  width: 100vw;
`;

export type ErrorLoudlyInDevOnlyProps = {
  displayMessage: string;
  logError: (rawError: Error | Error['message']) => void;
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
    logError(displayMessage);
  }, []);

  return isEnvDev ? (
    <StyledAlert type="error" placement="floating">
      {displayMessage}
    </StyledAlert>
  ) : null;
};
