import React from 'react';
import { Redirect } from '@reach/router';

export const NotFound: React.FC = () => <Redirect to="/getting-started" />;

// eslint-disable-next-line import/no-default-export
export default NotFound;
