import { shallow, mount } from 'enzyme';
import React from 'react';
import {
  LandingPageHero,
  LandingPageSectionCTA,
  LandingPageSectionTitle,
  LandingPageSectionDescription,
} from '..';

describe('LandingPageHero', () => {
  it('should only render a title when one is provided', () => {
    const wrapper = shallow(<LandingPageHero title="test" />);
    expect(wrapper.find(LandingPageSectionTitle)).toHaveLength(1);

    const wrapperNoTitle = shallow(<LandingPageHero />);
    expect(wrapperNoTitle.find(LandingPageSectionTitle)).toHaveLength(0);
  });

  it('should only render a description when one is provided', () => {
    const wrapper = shallow(<LandingPageHero desc="test" />);
    expect(wrapper.find(LandingPageSectionDescription)).toHaveLength(1);

    const wrapperNoDesc = shallow(<LandingPageHero />);
    expect(wrapperNoDesc.find(LandingPageSectionDescription)).toHaveLength(0);
  });

  it('should only render a button when both an href and cta are provided', () => {
    const wrapper = shallow(
      <LandingPageHero cta="test" ctaHref="https://codecademy.com" />
    );
    expect(wrapper.find(LandingPageSectionCTA)).toHaveLength(1);

    const wrapperNoHref = shallow(<LandingPageHero cta="test" />);
    expect(wrapperNoHref.find(LandingPageSectionCTA)).toHaveLength(0);

    const wrapperNoCta = shallow(
      <LandingPageHero ctaHref="https://codecademy.com" />
    );
    expect(wrapperNoCta.find(LandingPageSectionCTA)).toHaveLength(0);

    const wrapperNoCtaOrHref = shallow(<LandingPageHero />);
    expect(wrapperNoCtaOrHref.find(LandingPageSectionCTA)).toHaveLength(0);
  });

  it('should only render an image when an imgSrc is provided', () => {
    const wrapper = mount(<LandingPageHero imgSrc="test" />);
    expect(wrapper.find('img')).toHaveLength(1);

    const wrapperNoImg = mount(<LandingPageHero />);
    expect(wrapperNoImg.find('img')).toHaveLength(0);
  });
});
