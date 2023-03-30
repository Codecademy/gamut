import { Anchor, Box, BoxProps, Column, LayoutGrid } from '@codecademy/gamut';
import * as React from 'react';

import { LogoFromSkillsoft } from '../..';
import { footerResourcesList } from '../../lib/resourcesList';
import { FooterHeading } from '../FooterHeading';
import {
  FooterLinkItem,
  FooterLinkItems,
  FooterLinkItemWithAnchor,
} from '../FooterLinks';
import { GlobalFooterClickHandler } from '../types';
import { SocialMediaLinks } from './SocialMediaLinks';

export type CompanyLinksProps = {
  hidePricing?: boolean;
  onClick: GlobalFooterClickHandler;
};

export const CompanyLinks: React.FC<CompanyLinksProps> = ({
  hidePricing,
  onClick,
}) => {
  const community = (
    <Box>
      <FooterHeading>Community</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="https://discuss.codecademy.com"
            onClick={(event) => onClick({ event, target: 'forums' })}
            target="_blank"
            variant="interface"
          >
            Forums
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="https://community.codecademy.com/chapters"
            onClick={(event) => onClick({ event, target: 'chapters' })}
            target="_blank"
            variant="interface"
          >
            Chapters
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/events"
            onClick={(event) => onClick({ event, target: 'events' })}
            variant="interface"
          >
            Events
          </Anchor>
        </FooterLinkItem>
        {/* Refer a friend marketing anchor */}
        <FooterLinkItem>
          <span id="extole_zone_global_footer" />
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="https://discord.com/invite/codecademy"
            onClick={(event) => onClick({ event, target: 'discord' })}
            target="_blank"
            variant="interface"
          >
            Discord
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const company = (
    <>
      <FooterHeading>Company</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="/about"
            onClick={(event) => onClick({ event, target: 'about' })}
            variant="interface"
          >
            About
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/about/careers"
            onClick={(event) => onClick({ event, target: 'jobs' })}
            variant="interface"
          >
            Careers
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/pages/codecademy-affiliate-program"
            onClick={(event) => onClick({ event, target: 'affiliate_program' })}
            variant="interface"
          >
            Affiliates
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <SocialMediaLinks />
        </FooterLinkItem>
      </FooterLinkItems>
    </>
  );

  const plans = (
    <Box mb={{ _: 0, sm: 24 }}>
      <FooterHeading>Plans</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="/pages/paid-plans"
            onClick={(event) => onClick({ event, target: 'pro_membership' })}
            variant="interface"
          >
            Paid memberships
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/student-center"
            onClick={(event) => onClick({ event, target: 'students' })}
            variant="interface"
          >
            For students
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/business"
            onClick={(event) => onClick({ event, target: 'business_landing' })}
            variant="interface"
          >
            Business solutions
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const resources = (display: BoxProps['display']) => (
    <Box display={display}>
      <FooterHeading>Resources</FooterHeading>
      <FooterLinkItems>
        {footerResourcesList.map(
          ({ id, trackingTarget, href, text, newTab }) => (
            <FooterLinkItemWithAnchor
              key={id}
              footerOnClick={onClick}
              trackingTarget={trackingTarget}
              href={href}
              variant="interface"
              target={newTab ? '_blank' : ''}
            >
              {text}
            </FooterLinkItemWithAnchor>
          )
        )}
      </FooterLinkItems>
    </Box>
  );

  const support = (display: BoxProps['display']) => (
    <Box display={display} mt={{ _: 0, sm: 24 }}>
      <FooterHeading>Support</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="https://help.codecademy.com"
            onClick={(event) => onClick({ event, target: 'help' })}
            target="_blank"
            variant="interface"
          >
            Help Center
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const logo = (display: BoxProps['display']) => (
    <Box display={display} mt="auto">
      <FooterHeading>
        <LogoFromSkillsoft height={40} />
      </FooterHeading>
    </Box>
  );

  // Footer items change placement depending on screen size
  return (
    <LayoutGrid>
      <Column size={{ _: 6, sm: 4 }} order={1} gridTemplateRows="min-content">
        {company}
        {/* mobile */}
        {resources({ _: 'unset', sm: 'none' })}
        {support({ _: 'unset', sm: 'none' })}
      </Column>
      <Column
        size={{ _: 6, sm: 4 }}
        order={{ _: 3, sm: 2 }}
        gridTemplateRows="min-content"
      >
        {/* desktop/tablet */}
        {resources({ _: 'none', sm: 'unset' })}
        {support({ _: 'none', sm: 'unset' })}
      </Column>
      <Column
        size={{ _: 6, sm: 4 }}
        order={{ _: 2, sm: 3 }}
        gridTemplateRows="min-content"
      >
        {hidePricing ? null : plans}
        {community}
        {/* mobile */}
        {logo({ _: 'unset', sm: 'none' })}
      </Column>
      <Column
        size={4}
        order={4}
        gridTemplateRows="min-content"
        mt="auto"
        display={{ _: 'none', sm: 'block' }}
      >
        {/* desktop/tablet */}
        {logo({ _: 'none', sm: 'unset' })}
      </Column>
    </LayoutGrid>
  );
};
