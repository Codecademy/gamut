import { Anchor, Box, GridBox } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import { ResponsiveProp } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { FooterLinkArea, FooterLinkItem } from '../FooterLinks';
import { GlobalFooterClickHandler } from '../types';
import { SocialMediaLinks } from './SocialMediaLinks';

export type CompanyLinksProps = {
  onClick: GlobalFooterClickHandler;
  userGeo: string;
};

const MobileLinkArea = styled(FooterLinkArea)`
  grid-column: 1 / 3;

  ${theme.breakpoints.sm} {
    grid-column-end: 1;
    grid-row: 2 / 4;
    padding-top: 2rem;
  }
`;

const MobileImageLink = styled(Anchor)();

MobileImageLink.defaultProps = {
  display: 'inline-block',
  variant: 'interface',
  width: '50%',
};

const AppleMobileAppImage = styled.img`
  padding: 0.5rem 0.75rem;
  margin-left: -0.75rem;
`;

const AndroidMobileAppImage = styled.img`
  margin-left: -10px;
`;

export const CompanyLinks: React.FC<CompanyLinksProps> = ({
  onClick,
  userGeo,
}) => {
  const community = (
    <FooterLinkArea>
      <FooterHeading>Community</FooterHeading>
      <FooterLinkItem>
        <Anchor
          href="https://discuss.codecademy.com"
          onClick={onClick}
          variant="interface"
        >
          Forums
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor
          href="https://community.codecademy.com/chapters"
          onClick={onClick}
          variant="interface"
        >
          Chapters
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor href="/events" onClick={onClick} variant="interface">
          Events
        </Anchor>
      </FooterLinkItem>
    </FooterLinkArea>
  );

  const company = (
    <FooterLinkArea>
      <FooterHeading>Company</FooterHeading>
      <FooterLinkItem>
        <Anchor href="/about" onClick={onClick} variant="interface">
          About
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor href="/about/careers" onClick={onClick} variant="interface">
          We&apos;re Hiring
        </Anchor>
      </FooterLinkItem>
      {userGeo !== 'IN' && (
        <FooterLinkItem>
          <Anchor href="/shop" onClick={onClick} variant="interface">
            Shop
          </Anchor>
        </FooterLinkItem>
      )}
      <SocialMediaLinks />
    </FooterLinkArea>
  );

  const enterprisePlans = (
    <FooterLinkArea>
      <FooterHeading>Enterprise Plans</FooterHeading>
      <FooterLinkItem>
        <Anchor href="/business" onClick={onClick} variant="interface">
          For Business
        </Anchor>
      </FooterLinkItem>
    </FooterLinkArea>
  );

  const individualPlans = (
    <FooterLinkArea>
      <FooterHeading>Individual Plans</FooterHeading>
      <FooterLinkItem>
        <Anchor href="/pro/membership" onClick={onClick} variant="interface">
          Pro Membership
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor href="/student-center" onClick={onClick} variant="interface">
          For Students
        </Anchor>
      </FooterLinkItem>
    </FooterLinkArea>
  );

  const mobile = (
    <MobileLinkArea>
      <FooterHeading marginBottom={{ base: 8, sm: 16, lg: 0 }}>
        Mobile
      </FooterHeading>
      <Box display={{ sm: 'flex' }} flexDirection={{ sm: 'column' }}>
        <MobileImageLink
          href="https://itunes.apple.com/us/app/codecademy-go/id1376029326"
          onClick={onClick}
          target="_blank"
        >
          <AppleMobileAppImage
            alt="Download on the App Store"
            height="calc(40px + 1rem)"
            src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-US?size=140x20&amp;releaseDate=1533168000"
            width="calc(120px + 1.5rem)"
          />
        </MobileImageLink>
        <MobileImageLink
          href="https://play.google.com/store/apps/details?id=com.ryzac.codecademygo"
          onClick={onClick}
          target="_blank"
        >
          <AndroidMobileAppImage
            alt="Get it on Google Play"
            height="60px"
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            width="155px"
          />
        </MobileImageLink>
      </Box>
    </MobileLinkArea>
  );

  const resources = (
    <FooterLinkArea>
      <FooterHeading>Resources</FooterHeading>
      <FooterLinkItem>
        <Anchor
          href="https://news.codecademy.com"
          onClick={onClick}
          variant="interface"
        >
          Blog
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor
          href="/resources/cheatsheets/all"
          onClick={onClick}
          variant="interface"
        >
          Cheatsheets
        </Anchor>
      </FooterLinkItem>
      <FooterLinkItem>
        <Anchor href="/articles" onClick={onClick} variant="interface">
          Articles
        </Anchor>
      </FooterLinkItem>
    </FooterLinkArea>
  );

  const support = (display: ResponsiveProp<CSS.Properties['display']>) => (
    <FooterLinkArea display={display} marginTop={{ sm: 16 }} order={{ sm: 3 }}>
      <FooterHeading>Support</FooterHeading>
      <FooterLinkItem>
        <Anchor
          href="https://help.codecademy.com"
          onClick={onClick}
          variant="interface"
        >
          Help Center
        </Anchor>
      </FooterLinkItem>
    </FooterLinkArea>
  );

  return (
    <GridBox
      gridTemplateColumns={{
        base: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      {company}
      {resources}
      {support({ base: 'unset', sm: 'none' })}
      {community}
      {individualPlans}
      {enterprisePlans}
      {mobile}
      {support({ base: 'none', sm: 'unset' })}
    </GridBox>
  );
};
