declare module 'global';

declare namespace NodeJS {
  interface Global {
    STORYSHOTS_TOTAL: number;
    STORYSHOTS_INDEX: number;
  }
}

declare module '@storybook/addon-links/react' {
  export declare const LinkTo: React.FC<{ kind: string; id: string }>;
}
