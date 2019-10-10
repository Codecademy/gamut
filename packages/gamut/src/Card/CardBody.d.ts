import { ReactNode } from 'react';
export declare type CardBodyProps = {
    children: ReactNode | ReactNode[];
    className?: string;
    standardPadding?: boolean;
};
declare const CardBody: {
    ({ children, standardPadding, className }: CardBodyProps): JSX.Element;
    defaultProps: {
        standardPadding: boolean;
    };
};
export default CardBody;
