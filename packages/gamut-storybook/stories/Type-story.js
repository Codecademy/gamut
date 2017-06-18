import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Header, Paragraph, Code, Caption } from '@codecademy/gamut/Type';
// import { text } from '@kadira/storybook-addon-knobs';

storiesOf('Type', module)
  .addWithInfo(
    'Typography',
    () =>
      <div>
        <Header>Six Beers Paired With Six Metal Albums</Header>
        <Header size={4}>Heavy beers deserve heavy music</Header>
        <Paragraph>
          Metal music has the power to increase aggression, fuel workouts, hurt necks, and damage eardrums. Whether together or separate, beer and music should flow through your veins and elicit great emotion. Metal and stouts belong together. For your listening and drinking pleasure, start by pairing up the beers with our hand-selected metal albums below.
        </Paragraph>
        <Header size={3}>Surly Darkness, 10.3% ABV</Header>
        <Header size={5}>Metallica “…And Justice For All”</Header>
        <Paragraph>
          Laced with massive amounts of different flavors, Surly Darkness is one of the more fascinating and anticipated beers of any annual release. Darkness bottles have been graced by prominent horror figures such as a zombie, a vampire and the grim reaper. Even the devil himself has made an appearance. This heavy hitter ages gracefully over the years at 10.3% alcohol by volume, much like your favorite Metallica album.
        </Paragraph>
        <Header size={3}>3 Floyds Dark Lord, 15% ABV</Header>
        <Header size={5}>Black Sabbath, “Master of Reality”</Header>
        <Paragraph>
          Visualize, if you can, a big hulking figure reminiscent of Sauron from Lord of the Rings transformed into a beer. Thus, you have Dark Lord, an amazing Russian imperial stout full of beautiful cherry and fig taste. Dark Lord possesses a certain mystic status in the beer realm. The stout clocks in at a sneaky 15% and could easily deceive you. Listening to Pantera’s drop D tuning and double bass pedals will bring out the devil in the Sarsaparilla stout. There are big vanilla notes in the brew on top of a great sweetness to it all. But there’s nothing sweet about “Far Beyond Driven.” It is hostility in its purest form, fueled by hard alcohol and pain killers. Just don’t fuel yourself with those two. Stick to the music and beer.
        </Paragraph>
        <img
          src="https://d3l207izes6a7a.cloudfront.net/images/article/hero/October_Launch_Threes-38.jpg"
          width={300}
          alt="beer at bar"
        />
        <Caption>Rock out with this caption.</Caption>
        <Header size={6}>Sources</Header>
        <Paragraph><a href="https://oct.co/essays/six-beers-six-metal-albums">oct.o essays</a></Paragraph>
      </div>,
  {
    inline: true,
    propTables: false
  }
  )
  .addWithInfo(
    'Header',
    () =>
      <div>
        <Header>Header size 1</Header>
        <Header size={2}>Header size 2</Header>
        <Header size={3}>Header size 3</Header>
        <Header size={4}>Header size 4</Header>
        <Header size={5}>Header size 5</Header>
        <Header size={6}>Header size 6</Header>
      </div>,
  {
    inline: true
  }
  )
  .addWithInfo(
    'Paragraph',
    () =>
      <Paragraph>
        Paragraph: Between them and the beasts behind me there was little
        choice, but at
        least there was a doubt as to the reception these
        grotesque parodies on
        humanity would accord me, while there was none as to the fate which
        awaited me beneath the grinning fangs of my fierce pursuers. And so I
        raced on toward the trees intending to pass beneath that which held the
        man-things and take refuge in another farther on; but the wolf-dogs were
        very close behind me—so close that I had despaired of escaping them,
        when one of the creatures in the tree above swung down. Source: <a href="#">Sample link</a>
      </Paragraph>,
  {
    inline: true
  }
  )
  .addWithInfo(
    'Caption',
    () =>
      <div>
        <img src="https://avatar.tobi.sh?size=300" />
        <Caption>
          This image is a demonstration of a gradient.
        </Caption>
      </div>,
  {
    inline: true
  }
  )
  .addWithInfo(
    'Code',
    () =>
      <Paragraph>
        Booleans are either <Code>true</Code> or <Code>false</Code>.
      </Paragraph>,
  {
    inline: true
  }
  );
