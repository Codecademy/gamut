import { shallow, mount } from 'enzyme';
import React from 'react';
import { LandingPageHero } from '..';

describe('LandingPageHero', () => {
  it('should only render a title when one is provided', () => {
    const wrapper = shallow(<LandingPageHero title="test" testId="hero" />);
    expect(wrapper.find('*[testId="hero-title"]')).toHaveLength(1);

    const wrapperNoTitle = shallow(<LandingPageHero testId="hero" />);
    expect(wrapperNoTitle.find('*[testId="hero-title"]')).toHaveLength(0);
  });

  it('should only render a description when one is provided', () => {
    const wrapper = shallow(<LandingPageHero desc="test" testId="hero" />);
    expect(wrapper.find('*[testId="hero-desc"]')).toHaveLength(1);

    const wrapperNoDesc = shallow(<LandingPageHero testId="hero" />);
    expect(wrapperNoDesc.find('*[testId="hero-desc"]')).toHaveLength(0);
  });

  it('should only render a button when both an href and cta are provided', () => {
    const wrapper = shallow(
      <LandingPageHero
        cta="test"
        ctaHref="https://codecademy.com"
        testId="hero"
      />
    );
    expect(wrapper.find('*[testId="hero-cta"]')).toHaveLength(1);

    const wrapperNoHref = shallow(<LandingPageHero cta="test" testId="hero" />);
    expect(wrapperNoHref.find('*[testId="hero-cta"]')).toHaveLength(0);

    const wrapperNoCta = shallow(
      <LandingPageHero ctaHref="https://codecademy.com" testId="hero" />
    );
    expect(wrapperNoCta.find('*[testId="hero-cta"]')).toHaveLength(0);

    const wrapperNoCtaOrHref = shallow(<LandingPageHero testId="hero" />);
    expect(wrapperNoCtaOrHref.find('*[testId="hero-cta"]')).toHaveLength(0);
  });

  it('should only render an image when an imgSrc is provided', () => {
    const wrapper = mount(<LandingPageHero imgSrc="test" testId="hero" />);
    expect(wrapper.find('img')).toHaveLength(1);

    const wrapperNoImg = mount(<LandingPageHero testId="hero" />);
    expect(wrapperNoImg.find('img')).toHaveLength(0);
  });
});
