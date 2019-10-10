import { ReactNode } from 'react';
interface BannerCardProps {
    withStack?: boolean;
    eyebrow?: ReactNode;
    headerClassName?: string;
    headerChildren?: ReactNode;
    contentChildren?: ReactNode;
    footerChildren?: ReactNode;
}
declare function BannerCard(props: BannerCardProps): JSX.Element;
export default BannerCard;
