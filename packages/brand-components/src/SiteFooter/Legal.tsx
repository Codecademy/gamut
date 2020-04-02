import React, { Fragment, Component } from 'react';
import footerStrings from './localized.json';

import { FooterLegalUrls } from './FooterData';
import s from './styles/index.scss';

export type LegalProps = {
  urls: FooterLegalUrls;
};

class Legal extends Component<LegalProps> {
  render() {
    const { urls } = this.props;

    return (
      <div className={s.legalLinks}>
        {Object.entries(urls).map(([key, value]) => (
          <Fragment key={key}>
            <a className={s.legalLink} href={value} key={key}>
              {footerStrings[key]}
            </a>
            <span className={s.divider} />
          </Fragment>
        ))}
      </div>
    );
  }
}

export default Legal;
