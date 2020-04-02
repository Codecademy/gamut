import React, { Component } from 'react';
import _ from 'lodash';
import footerStrings from './localized.json';
import { Container, Item } from '@codecademy/gamut/dist/FlexBox';
import { trackUserClick } from 'libs/eventTracking';
import CatalogLinks from './CatalogLinks';
import SocialMediaLinks from './SocialMediaLinks';
import s from './styles/index.scss';
import { FooterCatalogLinkFilters, FooterLinksUrls } from './FooterData';

type FooterKey = keyof typeof footerStrings;

const content = (key: FooterKey) => footerStrings[key];

const handleLinkClick = (key: string) => {
  trackUserClick({
    target: key,
    context: 'footer',
    page_name: key,
  });
};

const buildLink = (key: FooterKey, url: string) => (
  <a
    className={s.footerReference}
    href={url}
    key={key}
    onClick={() => handleLinkClick(key)}
  >
    {content(key)}
  </a>
);

export type FooterLinksProps = {
  filters: FooterCatalogLinkFilters;
  urls: FooterLinksUrls;
  onClickCatalogLink: (payload: any) => void;
};

class FooterLinks extends Component<FooterLinksProps> {
  buildLinkArea(type: keyof FooterLinksUrls) {
    const linkData = this.props.urls[type];
    const links = _.map(Object.keys(linkData), key =>
      buildLink(key as FooterKey, linkData[key])
    );

    return (
      <div className={s.linkArea}>
        <div aria-level={2} className={s.linkHeader} role="heading">
          {content(type)}
        </div>
        {links}
        {type === 'company' && <SocialMediaLinks />}
      </div>
    );
  }

  render() {
    const { onClickCatalogLink } = this.props;
    return (
      <Container className={s.footerLinkContainer}>
        <Item>{this.buildLinkArea('company')}</Item>
        <Item className={s.courses}>
          <div aria-level={2} className={s.linkHeader} role="heading">
            {content('catalog')}
          </div>
          <CatalogLinks
            filters={this.props.filters}
            onClickCatalogLink={onClickCatalogLink}
          />
        </Item>
        <Item>{this.buildLinkArea('resources')}</Item>
      </Container>
    );
  }
}

export default FooterLinks;
