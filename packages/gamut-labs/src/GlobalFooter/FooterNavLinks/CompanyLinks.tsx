import { Anchor, Box, GridBox } from '@codecademy/gamut';
import { ResponsiveProp } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import * as CSS from 'csstype';
import React from 'react';

import { FooterHeading } from '../FooterHeading';
import { FooterLinkItem, FooterLinkItems } from '../FooterLinks';
import { GlobalFooterClickHandler } from '../types';
import downloadOnTheAppStore from './assets/download-on-the-app-store.svg';
import getItOnGooglePlay from './assets/get-it-on-google-play.png';
import { SocialMediaLinks } from './SocialMediaLinks';

export type CompanyLinksProps = {
  onClick: GlobalFooterClickHandler;
  userGeo: string;
};

const MobileImageItem = styled(Box)();

MobileImageItem.defaultProps = {
  as: 'li',
  display: 'inline-block',
  marginY: 8,
  width: {
    base: '50%',
    md: '90%',
  },
};

const MobileImageLink = styled(Anchor)();

MobileImageLink.defaultProps = {
  display: 'inline-block',
  variant: 'interface',
};

export const CompanyLinks: React.FC<CompanyLinksProps> = ({
  onClick,
  userGeo,
}) => {
  const community = (
    <Box>
      <FooterHeading>Community</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="https://discuss.codecademy.com"
            onClick={(event) => onClick({ event, target: 'forums' })}
            variant="interface"
          >
            Forums
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="https://community.codecademy.com/chapters"
            onClick={(event) => onClick({ event, target: 'chapters' })}
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
            We&apos;re Hiring
          </Anchor>
        </FooterLinkItem>
        {userGeo !== 'IN' && (
          <FooterLinkItem>
            <Anchor
              href="https://shop.codecademy.com"
              onClick={(event) => onClick({ event, target: 'shop' })}
              variant="interface"
            >
              Shop
            </Anchor>
          </FooterLinkItem>
        )}
        <FooterLinkItem>
          <SocialMediaLinks />
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const enterprisePlans = (
    <Box>
      <FooterHeading>Enterprise Plans</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="/business"
            onClick={(event) => onClick({ event, target: 'business_landing' })}
            variant="interface"
          >
            For Business
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const individualPlans = (
    <Box>
      <FooterHeading>Individual Plans</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="/pro/membership"
            onClick={(event) => onClick({ event, target: 'pro_membership' })}
            variant="interface"
          >
            Pro Membership
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/student-center"
            onClick={(event) => onClick({ event, target: 'students' })}
            variant="interface"
          >
            For Students
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const mobile = (
    <Box
      gridColumn="1 / 3"
      gridColumnEnd={{ sm: '1' }}
      gridRow={{ sm: '2 / 4' }}
      paddingTop={{ sm: 32 }}
    >
      <FooterHeading mb={{ _: 8, sm: 16, lg: 0 }}>Mobile</FooterHeading>
      <FooterLinkItems
        display={{ sm: 'flex' }}
        flexDirection={{ sm: 'column' }}
      >
        <MobileImageItem>
          <MobileImageLink
            href="https://itunes.apple.com/us/app/codecademy-go/id1376029326"
            onClick={(event) => onClick({ event, target: '' })}
            target="_blank"
          >
            <img
              alt="Download on the App Store"
              height="calc(40px + 1rem)"
              src={downloadOnTheAppStore}
              width="calc(120px + 1.5rem)"
            />
          </MobileImageLink>
        </MobileImageItem>
        <MobileImageItem>
          <MobileImageLink
            href="https://play.google.com/store/apps/details?id=com.ryzac.codecademygo"
            onClick={(event) => onClick({ event, target: '' })}
            target="_blank"
          >
            <img
              alt="Get it on Google Play"
              height="calc(40px + 1rem)"
              src={getItOnGooglePlay}
              width="calc(133px + 1.5rem)"
            />
          </MobileImageLink>
        </MobileImageItem>
      </FooterLinkItems>
    </Box>
  );

  const resources = (
    <Box>
      <FooterHeading>Resources</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="https://news.codecademy.com"
            onClick={(event) => onClick({ event, target: '' })}
            variant="interface"
          >
            Blog
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/resources/cheatsheets/all"
            onClick={(event) => onClick({ event, target: '' })}
            variant="interface"
          >
            Cheatsheets
          </Anchor>
        </FooterLinkItem>
        <FooterLinkItem>
          <Anchor
            href="/articles"
            onClick={(event) => onClick({ event, target: '' })}
            variant="interface"
          >
            Articles
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
  );

  const support = (display: ResponsiveProp<CSS.Properties['display']>) => (
    <Box display={display} marginTop={{ sm: 16 }} order={{ sm: 3 }}>
      <FooterHeading>Support</FooterHeading>
      <FooterLinkItems>
        <FooterLinkItem>
          <Anchor
            href="https://help.codecademy.com"
            onClick={(event) => onClick({ event, target: 'help' })}
            variant="interface"
          >
            Help Center
          </Anchor>
        </FooterLinkItem>
      </FooterLinkItems>
    </Box>
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
