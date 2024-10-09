declare module 'react-freezeframe' {
  export interface FreezeframeProps {
    className?: string;
    src: string;
  }

  // eslint-disable-next-line react/prefer-stateless-function
  export default class Freezframe extends React.Component<FreezeframeProps> {}
}
