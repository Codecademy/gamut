/**
 * Exported enums sometimes come up undefined when used in Jest tests because of the way they are compiled. Be careful when using this in test mocks.
 */
export var ContainerDifficulty;

/**
 * converting ContainerDifficulty enum into union type
 */
(function (ContainerDifficulty) {
  ContainerDifficulty["Beginner"] = "Beginner";
  ContainerDifficulty["Intermediate"] = "Intermediate";
  ContainerDifficulty["Advanced"] = "Advanced";
})(ContainerDifficulty || (ContainerDifficulty = {}));
export var DifficultyString;
(function (DifficultyString) {
  DifficultyString[DifficultyString["Beginner friendly"] = 0] = "Beginner friendly";
  DifficultyString[DifficultyString["Intermediate"] = 1] = "Intermediate";
  DifficultyString[DifficultyString["Advanced"] = 2] = "Advanced";
})(DifficultyString || (DifficultyString = {}));