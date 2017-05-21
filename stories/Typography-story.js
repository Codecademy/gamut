import React from 'react';
import { storiesOf } from '@kadira/storybook';

const containerStyles = {
  display: 'flex',
  alignItems: 'baseline'
};

const label = {
  textTransform: 'uppercase',
  color: 'grey',
  marginRight: '1em'
};

storiesOf('Typography', module)
  .add(
    'Typographic elements',
    () => (
      <div>
        <div style={containerStyles}>
          <div style={label}>h1</div>
          <h1>Main heading</h1>
        </div>
        <div style={containerStyles}>
          <div style={label}>h2</div>
          <h2>Subpage title</h2>
        </div>
        <div style={containerStyles}>
          <div style={label}>h3</div>
          <h3>Section header</h3>
        </div>
        <div style={containerStyles}>
          <div style={label}>h4</div>
          <h4>Sub section heading</h4>
        </div>
        <div style={containerStyles}>
          <div style={label}>h5</div>
          <h5>Bold content</h5>
        </div>
        <div style={containerStyles}>
          <div style={label}>h6</div>
          <h6>Labels and meta content</h6>
        </div>
        <div style={containerStyles}>
          <div style={label}>p</div>
          <p>Body copy</p>
        </div>
        <div style={containerStyles}>
          <div style={label}>caption</div>
          <caption>Caption text</caption>
        </div>
        <div style={containerStyles}>
          <div style={label}>link</div>
          <a href="">Link</a>
        </div>
        <div style={containerStyles}>
          <div style={label}>code</div>
          <p>This is a <code>codeWord</code></p>
        </div>
        <div style={containerStyles}>
          <div style={label}>code block</div>
          <pre>
            <code>console.log('code');</code>
          </pre>
        </div>
        <div style={containerStyles}>
          <div style={label}>ordered list</div>
          <ol>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ol>
        </div>
        <div style={containerStyles}>
          <div style={label}>unordered list</div>
          <ul>
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
        </div>
        <hr />
        <h1>This is a first level header</h1>
        <h4>This is a fourth level header, great for subtitles.</h4>
        <p>In The Hidden Life of Trees, Peter Wohlleben shares his deep love of woods and forests and explains the amazing processes of life, death, and regeneration he has observed in the woodland and the amazing scientific processes behind the wonders of which we are blissfully unaware. Much like human families, tree parents live together with their children, communicate with them, and support them as they grow, sharing nutrients with those who are sick or struggling and creating an ecosystem that mitigates the impact of extremes of heat and cold for the whole group.</p>
        <h2>This is a second level header</h2>
        <p> As a result of such interactions, trees in a family or community are protected and can live to be very old. In contrast, solitary trees, like street kids, have a tough time of it and in most cases die much earlier than those in a group.</p>
        <h3>This is a third level header</h3>
        <p>Drawing on groundbreaking new discoveries, Wohlleben presents the science behind the secret and previously unknown life of trees and their communication abilities; he describes how these discoveries have informed his own practices in the forest around him.</p>
        <h4>This is a fourth level header</h4>
        <p>As he says, a happy forest is a healthy forest, and he believes that eco-friendly practices not only are economically sustainable but also benefit the health of our planet and the mental and physical health of all who live on Earth.</p>
        <h5>This is a fifth level header</h5>
        <p>They are large trees, reaching heights of 10–80 m (33–262 ft) tall and trunk diameters of 0.5–4 m (1 ft 8 in–13 ft 1 in) when mature. Firs can be distinguished from other members of the pine family by the unique attachment of their needle-like leaves and by their different cones.</p>
        <h6>This is a sixth level header</h6>
        <p>The corkbark fir Abies lasiocarpa var. arizonica occurs in Arizona and New Mexico. It differs in thicker, corky bark and more strongly glaucous foliage. In resin composition it is closer to A. bifolia than to typical A. lasiocarpa, though the combination "Abies bifolia var. arizonica" has not been formally published.</p>
      </div>
    )
  );
