import { Source } from '@storybook/blocks';
import { SourceType } from '@storybook/docs-tools';
import { ComponentProps } from 'react';

export const StorySource = ({
  of,
}: Pick<ComponentProps<typeof Source>, 'of'>) => {
  return (
    <Source
      dark
      of={of}
      type={SourceType.CODE}
      transform={(code) => {
        // Show only the code within the story's render tag
        const lookup = /(?<=(render[\s\S]*<))[\s\S]+(?=(>[\s\S]*)(name:))/;
        const match = (code.match(lookup) || [])[0];

        // Fix indentation
        const reindented = match?.replaceAll(/(?<=\n) {4}/gm, '') || '';

        // Add back the open and closing brackets removed in the regex
        return '<' + reindented + '>';
      }}
    />
  );
};
