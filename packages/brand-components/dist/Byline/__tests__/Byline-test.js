import { mount } from 'enzyme';
import React from 'react';
import { Byline } from '..';
describe('Byline', function () {
  it('displays a location when the "location" prop is passed', function () {
    var wrapper = mount(React.createElement(Byline, {
      firstName: "C\xE9sar",
      lastName: "Milan",
      occupation: "Dog Whisperer",
      location: "Los Angeles, CA"
    }));
    expect(wrapper.text()).toContain('Los Angeles, CA');
  });
  it('passes a location className for the location span element', function () {
    var wrapper = mount(React.createElement(Byline, {
      firstName: "C\xE9sar",
      lastName: "Milan",
      occupation: "Dog Whisperer",
      location: "Los Angeles, CA",
      classNames: {
        location: 'coolStyleDawg'
      }
    }));
    expect(wrapper.find('span[className="coolStyleDawg"]')).toHaveLength(1);
  });
  it('passes an occupation className for the occupation span element', function () {
    var wrapper = mount(React.createElement(Byline, {
      firstName: "C\xE9sar",
      lastName: "Milan",
      occupation: "Dog Whisperer",
      classNames: {
        jobContainer: 'evenCoolerStyleDawg'
      }
    }));
    var jobContainer = wrapper.find('div[data-testid="job-container"]');
    expect(jobContainer.prop('className')).toBe('evenCoolerStyleDawg');
  });
  it('combines a passed down className with the default styles for the author span element', function () {
    var wrapper = mount(React.createElement(Byline, {
      firstName: "C\xE9sar",
      lastName: "Milan",
      occupation: "Dog Whisperer",
      classNames: {
        author: 'boldNameText'
      }
    }));
    var name = wrapper.find('span[data-testid="author-container"]');
    expect(name.prop('className')).toBe('author boldNameText');
  });
});