# Gamut Icons

## Icon Guidelines

1. All Icons regardless of intended final size have a base size of 16px, this means they should look crispiest at 8px, 16px, 32px, 64px, etc.
2. Standard UI icons need no prefix. Example: a `close` icon that shows a standard `X` glyph, would be called `CloseIcon`. Icons that don't fit that description should use a common prefix with other like-icons. Example: Icons for social media sites should start with `social`, like `SocialTwitterIcon`.


## Adding an icon

1. Add your SVG file to the `src` folder
2. Run `yarn build-all` from the root folder (or `yarn build` if you are working inside of the `gamut-icons` directory)
3. Start storybook and go to http://localhost:6006/?path=/story/visuals-icons--all-icons
4. Make sure your icon shows up and looks accurate


