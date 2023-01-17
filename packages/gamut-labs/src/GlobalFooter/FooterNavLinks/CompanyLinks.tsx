import { Anchor, Box, BoxProps, FlexBox, GridBox } from '@codecademy/gamut';
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
  const community = (display: BoxProps['display']) => (
    <Box display={display} mt={{ sm: 16 }} order={{ sm: 3 }}>
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
    <Box>
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
    </Box>
  );

  const plans = (
    <Box>
      <FooterHeading>Plans</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="/pages/pro"
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

  const resources = (
    <Box>
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
    <Box display={display} mt={{ sm: 16 }} order={{ sm: 3 }}>
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

  const logo = (
    <FooterHeading mt="auto">
      <LogoFromSkillsoft height={40} />
    </FooterHeading>
  );

  return (
    <GridBox
      gridTemplateColumns={{
        _: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
      }}
      rowGap={16}
    >
      {company}
      <FlexBox flexDirection="column">
        {resources}
        {support({ _: 'none', sm: 'unset' })}
      </FlexBox>
      <FlexBox flexDirection="column">
        {hidePricing ? null : plans}
        {community({ _: 'none', sm: 'unset' })}
      </FlexBox>
      {support({ _: 'unset', sm: 'none' })}
      {logo}
    </GridBox>
  );
};
