import React from 'react';
import { ContentDifficultyProps, DifficultyVariant } from '../Difficulty/types';
export declare type SubtitleProps = Pick<ContentDifficultyProps, 'difficulty'> & {
    scope: Record<string, number>;
    showAltSubtitle?: boolean;
    difficultyVariant?: DifficultyVariant;
};
export declare const Subtitle: React.FC<SubtitleProps>;
