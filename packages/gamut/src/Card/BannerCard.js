import React from 'react';
import { CardShell, CardHeader, CardStack } from './index';
import styles from './styles/BannerCard.scss';
function BannerCard(props) {
  return React.createElement(
    CardShell,
    { className: styles.bannerCardContainer },
    React.createElement(
      CardHeader,
      { className: props.headerClassName },
      props.eyebrow,
      props.headerChildren
    ),
    props.contentChildren,
    props.footerChildren,
    props.withStack && React.createElement(CardStack, null)
  );
}
export default BannerCard;
//# sourceMappingURL=BannerCard.js.map
