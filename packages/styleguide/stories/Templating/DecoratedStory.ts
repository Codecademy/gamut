import { StoryContext, WrapperSettings } from '@storybook/addons';

type DecoratedStory = {
  (
    name: string,
    context: () => void,
    storyConfig?: Partial<WrapperSettings>
  ): StoryContext;
  (context: () => void, storyConfig?: Partial<WrapperSettings>): StoryContext;
};

export const decoratedStory: DecoratedStory = (...args: any[]) => {
  const [name, context, storyConfig] =
    typeof args[0] === 'string' ? args : [args[0].name, args[0], args[1]];

  (context as StoryContext).story = {
    name,
    ...storyConfig,
  };

  return context;
};
