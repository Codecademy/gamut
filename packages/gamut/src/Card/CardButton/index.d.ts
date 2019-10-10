import { ReactNode } from 'react';
interface CardButtonProps {
    icon?: ReactNode;
    title: string;
    action?: () => void;
    withArrow?: boolean;
    className?: string;
}
declare function CardButton(props: CardButtonProps): JSX.Element;
export default CardButton;
