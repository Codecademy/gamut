import {
  AppWrapper,
  Box,
  ContentContainer,
  StrokeButton,
} from '@codecademy/gamut';
import { GlobalHeader } from '@codecademy/gamut-labs';
import { Background } from '@codecademy/gamut-styles';
import React, { useState } from 'react';

export const mockArticle = {
  title: 'Accessibility and HTML',
  description:
    "Many visually-impaired users browse the Internet with the user of a screen reader. In this article, you'll learn about various ways to make your content accessible to visually-impaired or blind users.",
  content:
    '<!-- These should be ##s, not ###s. The page cannot jump from the h1 article title to h3s. Please keep them as is. :) -->\n\n## **Introduction**\n\nWhen designing and creating web pages, it\'s important that the web pages are accessible to all audiences. In particular, due to the visual and dynamic nature of the webpages that you’ll be making, it’s important to make sure that your website will also make sense to visually-impaired or blind users.\n\nMany visually-impaired or blind users access web pages with the help of **screen readers**. Screen readers parse through the HTML of your web page and read the contents out loud, responding to commands to navigate around the page, and take actions such as clicking on a link, typing in an input field, or submitting a form. In this resource, we’ll give an overview of a few ways that you can improve the accessibility of your web page and help screen readers better interpret it!\n\n## **Alt text**\n\nOne way to make the elements of your page more comprehensible to screen readers is to provide `alt` text for images. Alt, or alternative, text is provided as an attribute to the `<img>` tag to describe the image to the screen reader. For instance, when encountering the below... \n\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Web Page!</title>\n  </head>\n  <body>\n<img src="https://en.wikipedia.org/wiki/File:Brown_bear.jpg" alt="A brown bear"/>\n  </body>\n</html>\n```\n\n...the screen reader will be able to read aloud the description of the image ("A brown bear") to the user, as opposed to simply informing the user that an image exists on the page. Be sure to provide succinct `alt` text descriptions for each image on your web page! \n\n## **Semantic tags**\n\nAs we think about styling text on a webpage, you might have noticed some overlap between the following pairs of tags: \n\n`<b>` vs. `<strong>` \n`<i>` vs. `<em>`\n\nIf you ever try swapping one of the tags in a pair for the other, you’ll most likely see that there’s little to no change in how the page looks. Both the `<b>` and `<strong>` tags bolden text, and the `<i>` and `<em>` italicize text. However, there’s a fundamental difference between each of the tags in a pair when it comes to accessibility!\n\nThe `<b>` and `<i>` elements simply denote how the text should _look_: text within these tags should appear as bold or italicized, respectively. \n\n`<strong>` and `<em>`, however, denote how text should be *understood* and, though they result in the same visual appearance, they affect how the screen reader interprets them: text within these tags are read out with a different voice to indicate the emphasis for each. These tags are known as _semantic tags_.\n\nSo although `<strong>` and `<em>` result in visually similar text as `<b>` and `<i>`, they provide a way for screen readers to communicate the parts of text that are already highlighted visually to the user. \n\n## **ARIA**\n\nARIA, also known as WAI-ARIA, stands for `Accessible Rich Internet Applications`. ARIA defines a variety of `markup extensions`, usually HTML5 attributes, that can be added to elements to give screen readers more information about the element and help visually-impaired users better grasp what’s happening on the webpage. \n\nFor instance, one useful ARIA attribute is the `role` attribute. When added to an element, this will provide the screen reader with extra context about what that element’s function is in context of a page. For instance, the following HTML code is easily understood by a human to be a menu: \n\n```html\n<nav>\n <ul>\n   <li>Put navigation here</li>\n </ul>\n</nav>\n```\n\nTo a screen reader, however, it’s not so simple. To remedy this, we can add the `role` attribute with value `navigation`: \n\n```html\n<nav role="navigation">\n <ul>\n   <li>Put navigation here</li>\n </ul>\n</nav>\n```\n\nNow, the screen reader will know that this is a menu and present the options to the user accordingly. \n\nThere are many other functions for ARIA attributes, such as telling the user the state of forms and checkboxes, and even calling their attention to an element on the page that was just changed by JavaScript. We won’t cover everything related to ARIA in this article, but feel free to check out the spec <a aria-label="Mozilla ARIA specification" href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA" target="_blank">here</a>.',
};

export const articles = new Array(50).fill(0).map((_, i) => ({
  id: `11c7913799e1718833fcc3bf425ffa8e-${i}`,
  title: 'Accessibility and HTML',
  type: 'article',
  slug: 'accessibility-and-html',
  description:
    "Many visually-impaired users browse the Internet with the user of a screen reader. In this article, you'll learn about various ways to make your content accessible to visually-impaired or blind users.",
}));

export const AppDecorator: React.FC = ({ children }) => {
  const [mode, setMode] = useState('light');
  return (
    <Background
      initialBackground={mode === 'dark' ? 'navy' : 'washBeige'}
      minHeight="100vh"
    >
      <AppWrapper>
        <GlobalHeader
          action={() => {}}
          type="free"
          user={{
            avatar:
              'https://www.gravatar.com/avatar/1c959a9a1e2f9f9f1ac06b05cccc1d60?s=150&d=retro',
            displayName: 'Codey',
          }}
        />
        <Box paddingY={32}>
          <ContentContainer>
            {children}
            <AppWrapper>
              <Box position="fixed" left="0" right="0" bottom="2rem">
                <Box display="flex" justifyContent="flex-end" padding={48}>
                  <StrokeButton
                    onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                    variant="primary"
                  >
                    {mode}
                  </StrokeButton>
                </Box>
              </Box>
            </AppWrapper>
          </ContentContainer>
        </Box>
      </AppWrapper>
    </Background>
  );
};
