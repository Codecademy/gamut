/**
 * Exported enums sometimes come up undefined when used in Jest tests because of the way they are compiled. Be careful when using this in test mocks.
 */
export declare enum ContainerDifficulty {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced"
}
/**
 * converting ContainerDifficulty enum into union type
 */
export declare type ContainerDifficultyUnion = `${ContainerDifficulty}`;
export declare type DifficultyVariant = 'small' | 'medium';
export declare type ContentDifficultyProps = {
    difficulty: ContainerDifficulty | ContainerDifficultyUnion;
    variant?: DifficultyVariant;
};
export declare enum DifficultyString {
    'Beginner friendly' = 0,
    'Intermediate' = 1,
    'Advanced' = 2
}
