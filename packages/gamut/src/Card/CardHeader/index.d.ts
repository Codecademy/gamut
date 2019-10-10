import { ReactNode } from 'react';
interface CardHeaderProps {
    backgroundColor?: string;
    backgroundImage?: string;
    children?: ReactNode;
    className?: string;
}
declare function CardHeader(props: CardHeaderProps): JSX.Element;
export default CardHeader;
