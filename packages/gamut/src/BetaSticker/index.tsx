import React from 'react';

type BetaStickerProps = {
  className?: string;
  children?: never;
  backgroundColor: string;
};

export const BetaSticker: React.FC<BetaStickerProps> = (props) => {
  const { backgroundColor } = props;
  return (
    <svg width="54" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 2h52v26H0V2z" fill="currentColor" />
      <path d="M2 0h52v26H2V0z" fill={backgroundColor} />
      <path
        d="M8 18.6h3.792c2.464 0 4.144-1.008 4.144-3.6 0-1.408-.704-2.208-1.648-2.624a2.862 2.862 0 001.248-2.384C15.536 7.576 13.84 7 11.6 7H8v11.6zm2.4-6.832V8.952h1.168c.976 0 1.456.48 1.456 1.408 0 .928-.48 1.408-1.456 1.408H10.4zm2.992 3.312c0 1.024-.512 1.536-1.696 1.536H10.4v-3.088h1.296c1.184 0 1.696.512 1.696 1.552zM18.568 18.6h7.024v-2.064h-4.624v-2.832h4.304V11.64h-4.304V9.064h4.624V7h-7.024v11.6zM31.168 18.6h2.4V9.064h3.28V7h-8.96v2.064h3.28V18.6zM38.231 18.6h2.56l.528-2.416h2.72l.528 2.416h2.624L44.2 7h-2.992l-2.976 11.6zm4.464-8.544l.928 4.256h-1.888l.96-4.256z"
        fill="currentColor"
      />
    </svg>
  );
};
