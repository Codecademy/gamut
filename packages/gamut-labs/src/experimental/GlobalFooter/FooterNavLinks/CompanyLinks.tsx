import { Anchor, Box, GridBox } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { FooterLinkArea, FooterLinkItem } from '../FooterLinks';
import { SocialMediaLinks } from './SocialMediaLinks';

export type CompanyLinksProps = {
  /**
   * Geographic region of the user viewing the footer, such as "IN" or "US".
   */
  userGeo: string;
};

const IndividualPlansLinkArea = styled(FooterLinkArea)`
  ${theme.breakpoints.sm} {
    grid-row-start: 2;
  }
`;

const SupportLinkArea = styled(FooterLinkArea)`
  ${theme.breakpoints.sm} {
    grid-row-start: 3;
    margin-top: 2rem;
  }
`;

const MobileLinkArea = styled(FooterLinkArea)`
  grid-column: 1 / 3;

  ${theme.breakpoints.sm} {
    grid-column-end: 1;
    grid-row: 2 / 4;
    padding-top: 2rem;
  }
`;

const MobileFooterHeading = styled(FooterHeading)`
  margin-bottom: 0.5rem;

  ${theme.breakpoints.sm} {
    margin-bottom: 1rem;
  }

  ${theme.breakpoints.lg} {
    margin-bottom: 0;
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

export const CompanyLinks: React.FC<CompanyLinksProps> = ({ userGeo }) => {
  return (
    <GridBox
      gridTemplateColumns={{
        base: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      <FooterLinkArea>
        <FooterHeading>Company</FooterHeading>
        <FooterLinkItem>
          <Anchor href="/about" variant="interface">
            About
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor href="/about/careers" variant="interface">
            We&apos;re Hiring
          </Anchor>
        </FooterLinkItem>
        {userGeo !== 'IN' && (
          <FooterLinkItem>
            <Anchor href="/shop" variant="interface">
              Shop
            </Anchor>
          </FooterLinkItem>
        )}
        <SocialMediaLinks />
      </FooterLinkArea>
      <FooterLinkArea>
        <FooterHeading>Resources</FooterHeading>
        <FooterLinkItem>
          <Anchor href="https://news.codecademy.com" variant="interface">
            Blog
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor href="/resources/cheatsheets/all" variant="interface">
            Cheatsheets
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor href="/articles" variant="interface">
            Articles
          </Anchor>
        </FooterLinkItem>
      </FooterLinkArea>
      <SupportLinkArea>
        <FooterHeading>Support</FooterHeading>
        <FooterLinkItem>
          <Anchor href="https://help.codecademy.com" variant="interface">
            Help Center
          </Anchor>
        </FooterLinkItem>
      </SupportLinkArea>
      <FooterLinkArea>
        <FooterHeading>Community</FooterHeading>
        <FooterLinkItem>
          <Anchor href="https://discuss.codecademy.com" variant="interface">
            Forums
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="https://community.codecademy.com/chapters"
            variant="interface"
          >
            Chapters
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor href="/events" variant="interface">
            Events
          </Anchor>
        </FooterLinkItem>
      </FooterLinkArea>
      <IndividualPlansLinkArea>
        <FooterHeading>Individual Plans</FooterHeading>
        <FooterLinkItem>
          <Anchor href="/pro/membership" variant="interface">
            Pro Membership
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor href="/student-center" variant="interface">
            For Students
          </Anchor>
        </FooterLinkItem>
      </IndividualPlansLinkArea>
      <FooterLinkArea>
        <FooterHeading>Enterprise Plans</FooterHeading>
        <FooterLinkItem>
          <Anchor href="/business" variant="interface">
            For Business
          </Anchor>
        </FooterLinkItem>
      </FooterLinkArea>
      <MobileLinkArea>
        <MobileFooterHeading>Mobile</MobileFooterHeading>
        <Box display={{ sm: 'flex' }} flexDirection={{ sm: 'column' }}>
          <MobileImageLink
            href="https://itunes.apple.com/us/app/codecademy-go/id1376029326"
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
    </GridBox>
  );
};
