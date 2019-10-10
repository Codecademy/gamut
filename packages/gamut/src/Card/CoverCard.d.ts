import { ReactNode } from 'react';
interface CoverCardProps {
    withWave?: boolean;
    withStack?: boolean;
    eyebrow?: ReactNode;
    headerClassName?: string;
    headerChildren?: ReactNode;
    contentChildren?: ReactNode;
    footerChildren?: ReactNode;
}
declare function CoverCard(props: CoverCardProps): JSX.Element;
export default CoverCard;
