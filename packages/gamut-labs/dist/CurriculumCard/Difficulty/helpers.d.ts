import { ContainerDifficulty } from './types';
/**
 * calculate the number associated with the difficulty level for a particular content
 *
 * @param difficulty level of difficulty for a particular content
 * @returns 0 indicating beginner, 1 intermediate and 2 for advanced content.
 */
export declare const getDifficultyNumber: <Type extends ContainerDifficulty | "Beginner" | "Intermediate" | "Advanced">(difficulty: Type) => 0 | 1 | 2;
