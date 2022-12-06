import * as React from 'react';

type GlobalFooterClickData = {
  /**
   * Native event from the data that can be .preventDefault()ed.
   */
  event: React.MouseEvent;

  /**
   * Data tracking target, such as 'about' or 'policy'.
   */
  target: string;
};

export type GlobalFooterClickHandler = (data: GlobalFooterClickData) => void;
