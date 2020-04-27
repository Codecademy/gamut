type DecoratedStory = {
  (name: string, context: () => void): any;
  (context: () => void): any;
};

export const decoratedStory: DecoratedStory = (...args: any[]) => {
  const [name, context] = args.length === 2 ? args : [args[0].name, args[0]];
  context.story = {
    name,
    options: {
      parameters: {
        knobs: {
          escapeHTML: false,
        },
      },
    },
  };

  return context;
};
