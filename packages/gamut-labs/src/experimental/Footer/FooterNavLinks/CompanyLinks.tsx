import { Anchor } from '@codecademy/gamut';
import { theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { LinkArea } from '../FooterLinkArea';
import { FooterLinkItem } from '../FooterLinkItem';

export type CompanyLinksProps = {
  userGeo?: string;
};

const CompanyLinksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0.875rem;
  grid-column-gap: 1.5rem;

  ${theme.breakpoints.sm} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const MobileImageLink = styled.a`
  display: inline-block;
  width: 50%;

  ${theme.breakpoints.sm} {
    width: auto;
  }
`;

const MobileLinkArea = styled(LinkArea)`
  grid-column: 1 / 3;

  ${theme.breakpoints.sm} {
    grid-column-end: 1;
    grid-row-start: 2;
  }
`;

const AndroidMobileAppImage = styled.img`
  margin-left: -10px;
`;

export const CompanyLinks: React.FC<CompanyLinksProps> = ({ userGeo }) => {
  return (
    <CompanyLinksContainer>
      <LinkArea>
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
              About
            </Anchor>
          </FooterLinkItem>
        )}
      </LinkArea>
      <LinkArea>
        <FooterHeading>Resouces</FooterHeading>
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
      </LinkArea>
      <LinkArea>
        <FooterHeading>Support</FooterHeading>
        <Anchor href="https://help.codecademy.com" variant="interface">
          Help Center
        </Anchor>
      </LinkArea>
      <LinkArea>
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
      </LinkArea>
      <LinkArea>
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
      </LinkArea>
      <LinkArea>
        <FooterHeading>Enterprise Plans</FooterHeading>
        <FooterLinkItem>
          <Anchor href="/business" variant="interface">
            For Business
          </Anchor>
        </FooterLinkItem>
      </LinkArea>
      <MobileLinkArea>
        <FooterHeading>Mobile</FooterHeading>
        <div>
          <MobileImageLink
            href="https://itunes.apple.com/us/app/codecademy-go/id1376029326"
            target="_blank"
          >
            <img
              alt="Download on the App Store"
              height="40px"
              src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-US?size=140x20&amp;releaseDate=1533168000"
              width="120px"
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
        </div>
      </MobileLinkArea>
    </CompanyLinksContainer>
  );
};
