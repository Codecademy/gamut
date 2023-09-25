import { Colors } from '@codecademy/gamut-styles';
import { UserClickData } from '@codecademy/tracking';
import * as React from 'react';
import { CorrectAnswerCountsBySubContent, UntestedSubContent } from './types';
export interface ScoreSummaryProps {
    subScores: CorrectAnswerCountsBySubContent;
    totalCorrect: number;
    totalQuestions: number;
    pathSlug: string;
    trackSlug?: string;
    trackingData?: UserClickData;
    lighterBorderColor?: Colors;
    layout?: 'column' | 'row';
    untestedSubContent?: UntestedSubContent[];
    trackUserClick?: (data: UserClickData) => void;
    description?: string;
    noMaxWidth?: boolean;
    colorfulIcons?: boolean;
}
export declare const ScoreSummary: React.FC<ScoreSummaryProps>;
