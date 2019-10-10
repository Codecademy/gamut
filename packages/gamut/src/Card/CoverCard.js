import React from 'react';
import { CardShell, CardHeader } from './index';
import styles from './styles/CoverCard.scss';
function CoverCard(props) {
  return React.createElement(
    CardShell,
    { className: styles.coverCardContainer },
    React.createElement(
      CardHeader,
      { className: props.headerClassName },
      props.eyebrow,
      props.contentChildren
    ),
    props.footerChildren
  );
}
export default CoverCard;
//# sourceMappingURL=CoverCard.js.map
