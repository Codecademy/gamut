declare module 'react-freezeframe' {
  export interface FreezeframeProps {
    className?: string;
    alt?: string;
    src: string;
  }

  export default class Freezeframe extends React.Component<FreezeframeProps> {}
}
