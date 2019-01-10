import React from 'react';
import { matchHtml } from '../../libs/matchers';
import Iframe from './component';

const iframe = {
  // Specify the order in which this rule is to be run
  order: 0,

  match(source) {
    // console.log(matchHtml('iframe').exec(source));
    // return matchHtml(iframe).exec(source);
    console.log(/^(<iframe\b[^>]*>.*?<\/iframe>)/gim.exec(source));
    return /^(<iframe\b[^>]*>.*?<\/iframe>)/gim.exec(source);
  },

  parse(capture, parse, state) {
    console.log(capture[0]);
    return {
      content: parse(capture[0], state),
    };
  },

  react(node, output) {
    console.log(node);
    return React.createElement(null, output(node.content));
  },
};

export default iframe;
