import * as React from 'react';
interface QuizScoreProps {
    correctCount: number;
    total: number;
    layout?: 'row' | 'column';
    smallerFont?: boolean;
    numOfRows?: number;
    colorfulIcons?: boolean;
}
export declare const QuizScore: React.FC<QuizScoreProps>;
export {};
