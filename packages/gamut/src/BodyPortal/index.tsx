import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

type BodyPortalProps = {
  onMount?: () => void;
  onDismount?: () => void;
};

export const BodyPortal: React.FC<BodyPortalProps> = ({
  children,
  onMount = () => {},
  onDismount = () => {},
}) => {
  useEffect(() => {
    onMount();
    return onDismount;
    // We only want this to run
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(children, document.body);
};

export default BodyPortal;
