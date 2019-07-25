# Gamut Icons

*UI Icons for the gamut component library*

## Icon Guidelines

1. All icons should be set in a square viewbox
2. All Icons should ideally be designed inside of a 16x16 pixel grid
3. Standard UI icons need no prefix. Example: a `close` icon that shows a standard `X` glyph, would be called `CloseIcon`. Icons that don't fit that description should use a common prefix with other like-icons. Example: Icons for social media sites should start with `social`, like `SocialTwitterIcon`.


## Adding an icon

1. Add your SVG file to the `src` folder
2. Run `yarn build-all` from the root folder (or `yarn build` if you are working inside of the `gamut-icons` directory)
3. Start storybook and go to http://localhost:6006/?path=/story/visuals-icons--all-icons
4. Make sure your icon shows up and looks accurate


