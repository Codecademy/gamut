export const decoratedStory = (context: any) => {
  context.story.options = {
    parameters: {
      knobs: {
        escapeHTML: false,
      },
    },
  };

  return context;
};
