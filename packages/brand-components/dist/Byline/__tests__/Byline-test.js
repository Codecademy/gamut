import { mount } from 'enzyme';
import React from 'react';
import { Byline } from '..';
describe('Byline', function () {
  it('displays a location when the "location" prop is passed', function () {
    var wrapper = mount(React.createElement(Byline, {
      name: "C\xE9sar Milan",
      occupation: "Dog Whisperer",
      location: "Los Angeles, CA"
    }));
    expect(wrapper.text()).toContain('Los Angeles, CA');
  });
  it('passes a location className for the location span element', function () {
    var wrapper = mount(React.createElement(Byline, {
      name: "C\xE9sar Milan",
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
      name: "C\xE9sar Milan",
      occupation: "Dog Whisperer",
      classNames: {
        occupation: 'evenCoolerStyleDawg'
      }
    }));
    var occupation = wrapper.find('span[aria-label="Occupation"]');
    expect(occupation.prop('className')).toBe('evenCoolerStyleDawg');
  });
  it('combines a passed down className with the default styles for the author span element', function () {
    var wrapper = mount(React.createElement(Byline, {
      name: "C\xE9sar Milan",
      occupation: "Dog Whisperer",
      classNames: {
        name: 'boldNameText'
      }
    }));
    var name = wrapper.find('span[aria-label="Name"]');
    expect(name.prop('className')).toBe('name boldNameText');
  });
});