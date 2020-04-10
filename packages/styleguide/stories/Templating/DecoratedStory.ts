type DecoratedStory = {
  (name: string, context: any): any;
  (context: any): any;
};

export const decoratedStory: DecoratedStory = (...args: any[]) => {
  const [name, context] = args.length === 2 ? args : [args[1].name, args[1]];

  context.story.options = {
    name,
    parameters: {
      knobs: {
        escapeHTML: false,
      },
    },
  };

  return context;
};
