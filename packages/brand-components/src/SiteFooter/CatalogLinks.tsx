import React, { Component } from 'react';

import { FooterCatalogLinkFilters } from './FooterData';
import s from './styles/CatalogLinks.scss';

export type CatalogLinksProps = {
  filters: FooterCatalogLinkFilters;
  onClickCatalogLink: (payload: any) => void;
};

export default class CatalogLinks extends Component<CatalogLinksProps> {
  renderLinksForSection = (sectionKey: 'language' | 'subject') => {
    const { filters, onClickCatalogLink } = this.props;
    const category = filters[sectionKey];

    const orderedFilters = category.filter_order.map(
      (key: keyof typeof category.names) => ({
        key,
        name: category.names[key],
      })
    );

    return orderedFilters.map(filter => {
      const eventPayload = {
        page_name: 'catalog',
        target: 'footer-link',
        section: sectionKey,
        category: filter.key,
        current_path: window.location.pathname,
      };

      return (
        <a
          key={filter.name}
          href={`/catalog/${sectionKey}/${filter.key}`}
          onClick={() => onClickCatalogLink(eventPayload)}
          className={s.filterLink}
        >
          {filter.name}
        </a>
      );
    });
  };

  render() {
    return (
      <section className={s.container}>
        <div className={s.column}>
          <h3 className={s.columnHeader}>By Subject</h3>
          <div className={s.linkSection}>
            {this.renderLinksForSection('subject')}
          </div>
        </div>
        <div className={s.column}>
          <h3 className={s.columnHeader}>By Language</h3>
          <div className={s.linkSectionLanguage}>
            {this.renderLinksForSection('language')}
          </div>
        </div>
      </section>
    );
  }
}
