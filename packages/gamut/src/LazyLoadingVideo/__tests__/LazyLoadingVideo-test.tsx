import { mount } from 'enzyme';
import React from 'react';
import { LazyLoadingVideo } from '..';

describe('LazyLoadingVideo', () => {
  it('loads a video with a vimeo URL', () => {
    const wrapper = mount(
      <LazyLoadingVideo
        videoUrl="https://vimeo.com/145702525"
        videoTitle="Super Science Friends"
      />
    );

    const title = wrapper.find('div').at(1).prop('title');

    expect(title).toBe('Super Science Friends');
  });

  it('loads a video with a youtube ID', () => {
    const wrapper = mount(
      <LazyLoadingVideo
        videoUrl="Yl8yy5tpVIM"
        videoTitle="Workout with Rick Sanchez"
      />
    );

    const title = wrapper.find('div').at(1).prop('title');

    expect(title).toBe('Workout with Rick Sanchez');
  });
});
