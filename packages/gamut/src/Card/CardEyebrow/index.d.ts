/// <reference types="react" />
import iconMap from '../../Icon/iconMap';
interface CardEyebrowProps {
    iconName?: keyof typeof iconMap;
    iconColor?: string;
    leftText?: string;
    rightText?: string;
    className?: string;
    isDarkTheme?: boolean;
}
declare function CardEyebrow(props: CardEyebrowProps): JSX.Element;
export default CardEyebrow;
