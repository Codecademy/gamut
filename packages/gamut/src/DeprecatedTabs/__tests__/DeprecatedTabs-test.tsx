import React from 'react';
import { shallow, mount } from 'enzyme';
import { Tab, TabPanel } from 'react-aria-tabpanel';
import Tabs from '../index';

describe('Accessible Tabs', () => {
  function generateTabConfig(num: number, isDefault = 0) {
    return Array(num)
      .fill(undefined)
      .map((x, ind) => {
        const displayInd = ind + 1;
        return {
          text: `Tab Number ${displayInd}`,
          default: isDefault === ind,
        };
      });
  }

  it('allows prop config to specify default tab and show appropriate tab panel', () => {
    const wrapper = shallow(
      <Tabs config={generateTabConfig(2)}>
        <div>Tab 1</div>
        <div>Tab 2</div>
      </Tabs>
    );

    expect((wrapper.find(Tab).at(0).props() as any).active).toBe(true);
    expect((wrapper.find('.tabPanel').at(0).props() as any).active).toBe(true);
    expect((wrapper.find(Tab).at(1).props() as any).active).toBe(false);
    expect((wrapper.find('.tabPanel').at(1).props() as any).active).toBe(false);

    const wrapper2 = shallow(
      <Tabs config={generateTabConfig(2, 1)}>
        <div>Tab 1</div>
        <div>Tab 2</div>
      </Tabs>
    );

    expect((wrapper2.find(Tab).at(0).props() as any).active).toBe(false);
    expect((wrapper2.find('.tabPanel').at(0).props() as any).active).toBe(
      false
    );
    expect((wrapper2.find(Tab).at(1).props() as any).active).toBe(true);
    expect((wrapper2.find('.tabPanel').at(1).props() as any).active).toBe(true);
  });

  it('does not render the contents of hidden tabs', () => {
    const wrapper = shallow(
      <Tabs config={generateTabConfig(2)}>
        <div>Tab 1</div>
        <div>Tab 2</div>
      </Tabs>
    );

    expect(wrapper.find('.tabPanel').at(0).children().html()).toBe(
      '<div>Tab 1</div>'
    );
    expect(wrapper.find('.tabPanel').at(1).children().html()).toBe(
      '<div></div>'
    );
  });

  it('Shows the correct tab panel on click, with proper tab highlighted via animated underline', () => {
    const wrapper = mount(
      <Tabs config={generateTabConfig(2)} animatedUnderlineStyle>
        <div>Tab 1</div>
        <div>Tab 2</div>
      </Tabs>
    );

    // highlight first tab + show first tab panel initially
    expect(
      wrapper.find(Tab).first().find('[aria-selected]').props()['aria-selected']
    ).toBe(true);
    expect(wrapper.find('.tabPanel').first().props().style).toBe(undefined);

    expect(
      wrapper.find(Tab).last().find('[aria-selected]').props()['aria-selected']
    ).toBe(false);

    expect(
      wrapper.find(TabPanel).last().children().at(0).props().style.display
    ).toBe('none');
    expect(wrapper.find('.tabIndicator').props().style).toEqual({
      left: '0%',
      width: '50%',
    });

    // now the second tab is active
    wrapper.find(Tab).last().simulate('focus');

    expect(
      wrapper.find(Tab).first().find('[aria-selected]').props()['aria-selected']
    ).toBe(false);
    expect(
      wrapper.find(TabPanel).first().children().at(0).props().style.display
    ).toBe('none');
    expect(
      wrapper.find(Tab).last().find('[aria-selected]').props()['aria-selected']
    ).toBe(true);
    expect(wrapper.find('.tabPanel').last().props().style!.display).toBe(
      undefined
    );
    expect(wrapper.find('.tabIndicator').props().style).toEqual({
      left: '50%',
      width: '50%',
    });
  });

  it('calls the onChange function provided in props when tabs change', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Tabs config={generateTabConfig(2)} onChange={onChange}>
        <div>Tab 1</div>
        <div>Tab 2</div>
      </Tabs>
    );
    wrapper.find(Tab).last().simulate('focus');

    expect(onChange.mock.calls.length).toBe(1);
  });
});
